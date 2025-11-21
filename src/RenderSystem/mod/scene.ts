import { Gruppe, Rect } from "../lib/Elemente.js";
import { System } from "../lib/module.js";
import { Mouse } from "../lib/mouse.js";
import { Vector2 } from "../lib/std.js";

export class Scene {
	parent: System | Gruppe;
	scenen: [Gruppe, Function | void | undefined, Rect][] = [];
	tab = 0;

	constructor(parent: System | Gruppe, ctx: CanvasRenderingContext2D) {
		this.parent = parent;
	}

	addScene(input: (parent: Gruppe) => Function | void | undefined, ctx: CanvasRenderingContext2D) {
		const gruppe = new Gruppe();
		this.parent.push(gruppe);
		const background = new Rect();
		background.position = new Vector2(0, 0);
		background.size = new Vector2(ctx.canvas.width, ctx.canvas.height);
		gruppe.elemente[0] = background;
		this.scenen.push([gruppe, input(gruppe), background]);
	}

	update(dt: number, ctx: CanvasRenderingContext2D, mouse: Mouse) {
		this.scenen.forEach(([gruppe, func, background], i) => {
			background.position = new Vector2((i - this.tab) * ctx.canvas.width, 0);
			background.size = new Vector2(ctx.canvas.width, ctx.canvas.height);
			gruppe.elemente[0] = background;
			if (func) func(gruppe, dt, mouse);
		});
	}
}