import { Elemente } from "../Elemente.js";

export class Gruppe {
	name: string = "Gruppe"
	elemente: Elemente[] = [];
	visible: boolean = true;

	constructor() {}

	push(element: Elemente) {
		this.elemente.push(element);
	}
	splice(index: number) {
		if (index < 0 || index >= this.elemente.length) return;
		return this.elemente.splice(index);
	}

	render(ctx: CanvasRenderingContext2D, dt: number) {
		if (!this.visible) return;
		for (let i = 0; i < this.elemente.length; i++) {
			this.elemente[i].render(ctx, dt);
		}
	}
}