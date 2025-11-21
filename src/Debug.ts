import { Elemente, Gruppe } from "./RenderSystem/lib/Elemente.js";
import { System } from "./RenderSystem/lib/module.js";

export function render(system: System, ctx: CanvasRenderingContext2D) {
	let y = 5;

	ctx.textBaseline = "top";
	ctx.textAlign = "left";
	ctx.font = "20px monospace"
	
	function list(gruppe: System | Gruppe | Elemente, text: string, last: boolean) {
		const text2 = text.slice(0, -2) +
			(text.length > 0 ? (last ? "\u2514 " : "\u251C ") : "");
		const text3 = gruppe.constructor.name +
			(gruppe instanceof Gruppe ? ": " + gruppe.name : "");
		
		ctx.fillStyle = "dimgray";
		ctx.fillRect(ctx.measureText(text2).width + 2, y - 1, ctx.measureText(text3).width + 7, 20)

		ctx.fillStyle = "white";
		ctx.fillText(text2 + text3, 5, y);
		y += 23;
		if (!(gruppe instanceof System || gruppe instanceof Gruppe)) return;

		for (let i = 0; i < gruppe.elemente.length; i++) {
			list(
				gruppe.elemente[i],
				text + (i == gruppe.elemente.length - 1 ? "  " : "\u2502 "),
				i == gruppe.elemente.length - 1
			);
		}
	}

	list(system, "", true);
}