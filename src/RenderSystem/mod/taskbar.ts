import { Gruppe, Rect, _Text } from "../lib/Elemente.js";
import type { System } from "../lib/module.js";
import { Mouse } from "../lib/mouse.js";
import { Color, Vector2 } from "../lib/std.js";

let width = 0;
export class Taskbar {
	texts: _Text[] = [];
	appearance = {
		background: new Color("rgba(92, 92, 92, 1)"),
		button: new Color("rgba(53, 53, 53, 1)"),
		text: new Color("rgba(255, 255, 255, 1)")
	};

	gruppe: Rect;
	auswahl: Rect;
	parent: System;
	tab = 0;
	events: Function[] = [];

	constructor(parent: System | Gruppe, ctx: CanvasRenderingContext2D) {
		this.parent = parent;

		this.gruppe = new Rect();
		this.gruppe.color = this.appearance.background;
		this.gruppe.position = new Vector2(0, (-ctx.canvas.height / 2) + 45);
		this.gruppe.animation.position = new Vector2(0, -ctx.canvas.height / 2);
		this.gruppe.round = 25;
		this.parent.push(this.gruppe);

		this.auswahl = new Rect();
		this.auswahl.position = this.gruppe.animation.position
			.add(new Vector2(this.gruppe.animation.size.x / 2, 0));
		this.auswahl.animation.position = this.auswahl.position;
		this.auswahl.color = this.appearance.button.clone();
		this.auswahl.round = 25;
		this.parent.push(this.auswahl);
	}

	push(name: string) {
		const text = new _Text();
		text.animation.position = this.gruppe.animation.position;
		text.color = this.appearance.text.clone();
		text.size = 26;
		text.text = name;

		this.texts.push(text);
		this.parent.push(text);
	}
	splice(index: number): void;
	splice(name: string): void;
	splice(value: number | string) {
		let e: _Text;
		if (typeof value == "number") {
			e = this.texts[value];
		} else {
			const i = this.texts.findIndex(v => v.text == value);
			if (i == -1) return;
			e = this.texts[i];
		}
		if (!e) return;
		const text = this.parent.elemente[this.parent.elemente.indexOf(e)] as _Text;

		text.size = 0;
		text.color.a = 0;
	}

	set onClick(func: Function) {
		this.events.push(func);
	}

	update(dt: number, ctx: CanvasRenderingContext2D, mouse: Mouse) {
		this.gruppe.position = new Vector2(0, (-ctx.canvas.height / 2) + 45);

		let x = -width / 2;
		width = -80;
		for (let i = 0; i < this.texts.length; i++) {
			if (this.texts[i].size == 0) {
				if (this.texts[i].animation.size <= 0.1) {
					this.parent.elemente.splice(this.parent.elemente.indexOf(this.texts[i]), 1);
					this.texts.splice(i, 1);
					i--;
				}
				continue;
			}

			ctx.font = this.texts[i].size + "px monospace";
			const mess = ctx.measureText(this.texts[i].text).width;

			this.texts[i].position = new Vector2(x + (mess / 2), this.gruppe.position.y);

			if (i == this.tab) {
				this.auswahl.position = this.texts[i].position.clone();
				this.auswahl.size = new Vector2(mess + 75, 35);
			}
			if (mouse.position.inBox(this.texts[i].position, new Vector2(mess + 50, 35))) {
				if (mouse.button.press) {
					this.tab = i;
					this.events.forEach(func => func());
				}
			}
			x += mess + 80;
			width += mess + 80;
		}
		this.gruppe.size = new Vector2(Math.max(50, width) + 130, 50);
	}
}