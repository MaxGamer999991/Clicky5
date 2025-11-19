import { Vector2 } from "./std.js";

export class Mouse {
	position: Vector2;
	velosity: Vector2;
	button: {
		position: Vector2,
		down: boolean,
		press: boolean,
		up: boolean
	};

	constructor() {
		this.position = new Vector2();
		this.velosity = new Vector2();
		this.button = {
			position: new Vector2(),
			down: false,
			press: false,
			up: false
		};
	}
}
const mouse: Mouse = new Mouse();
export function init() {
	function mouseDown(event: MouseEvent) {
		mouse.button.position = new Vector2(
			event.clientX - (innerWidth / 2),
			(innerHeight / 2) - event.clientY
		)
		mouse.button.down = true;
		mouse.button.press = true;
	}
	function mouseMove(event: MouseEvent) {
		mouse.position = new Vector2(
			event.clientX - (innerWidth / 2),
			(innerHeight / 2) - event.clientY
		);
	}
	function mouseUp(event: MouseEvent) {
		mouse.button.press = false;
		mouse.button.up = true;
		event;
	}
	document.addEventListener("mousedown", mouseDown);
	document.addEventListener("mousemove", mouseMove);
	document.addEventListener("mouseup", mouseUp);

	return mouse;
}
export function main() {
	mouse.button.down = false;
	mouse.button.up = false
}