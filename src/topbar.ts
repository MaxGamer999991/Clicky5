import { Gruppe, Rect, Text } from "./RenderSystem/lib/Elemente.js";
import { System } from "./RenderSystem/lib/module.js";
import { Mouse } from "./RenderSystem/lib/mouse.js";
import { Color, Vector2 } from "./RenderSystem/lib/std.js";

class Title {
	gruppe: Gruppe;

	background: Rect;
	text: Text;
	text2: Text;

	appearance = {
		background: new Color("rgba(92, 92, 92, 1)"),
		button: new Color("rgba(53, 53, 53, 1)"),
		text: new Color("rgba(255, 255, 255, 1)")
	};

	constructor(parent: Gruppe, ctx: CanvasRenderingContext2D) {
		this.gruppe = new Gruppe();
		this.gruppe.name = "Title";
		
		this.background = new Rect();
		this.background.animation.position = new Vector2(0, ctx.canvas.height / 2);
		this.background.color = this.appearance.background;
		this.background.round = 20;
		
		this.text = new Text();
		this.text.animation.position = new Vector2(0, ctx.canvas.height / 2 - 30);
		this.text.color = this.appearance.text;
		this.text.size = 25;
		this.text.text = "Clicky v5";
		this.text2 = new Text();
		this.text2.animation.position = new Vector2(0, ctx.canvas.height / 2 - 30);
		this.text2.color = this.appearance.text;
		this.text2.size = 25;
		this.text2.text = "Clicky v5";

		parent.push(this.gruppe);
		this.gruppe.push(this.background);
		this.gruppe.push(this.text);
		this.gruppe.push(this.text2);
	}

	update(dt: number, ctx: CanvasRenderingContext2D, mouse: Mouse) {
		ctx.font = this.text.size + "px monospace";
		
		this.background.position = new Vector2(0, (ctx.canvas.height / 2) - (this.background.size.y / 2) - 20);
		this.background.size = new Vector2(ctx.measureText(this.text.text).width + 100, 40);
		
		this.text.position = new Vector2(0, (ctx.canvas.height / 2) - 40);
		this.text2.position = this.text.position;
		this.text2.color = new Color("hsl(" + Math.floor(Math.sin(performance.now() / 5000) * 360) + ", 100%, 50%)");
		if (mouse.position.inBox(
			this.background.position,
			this.background.size
		)) {
			this.text2.color.a = 1;
			this.text.color.a = 0;
		} else {
			this.text2.color.a = 0;
			this.text.color.a = 1;
		}
	}
}
export class TopBar {
	gruppe: Gruppe;

	title: Title;

	appearance = {
		background: new Color("rgba(92, 92, 92, 1)"),
		button: new Color("rgba(53, 53, 53, 1)"),
		text: new Color("rgba(255, 255, 255, 1)")
	};

	constructor(parent: System | Gruppe, ctx: CanvasRenderingContext2D) {
		this.gruppe = new Gruppe();
		this.gruppe.name = "TopBar";
		parent.push(this.gruppe);

		this.title = new Title(this.gruppe, ctx);
	}

	update(dt: number, ctx: CanvasRenderingContext2D, mouse: Mouse) {
		this.title.update(dt, ctx, mouse);
	}
}