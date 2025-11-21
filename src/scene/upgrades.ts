import { _Text, Gruppe, Rect } from "../RenderSystem/lib/Elemente.js";
import { Mouse } from "../RenderSystem/lib/mouse.js";
import { Color } from "../RenderSystem/lib/std.js";

export default function main(parent: Gruppe) {
	(parent.elemente[0] as Rect).color = new Color("rgba(15, 15, 15, 1)");
	parent.name = "Upgrades";
	const text = new _Text();
	text.text = "upgrades";
	parent.push(text);
	return function main(gruppe: Gruppe, dt: number, mouse: Mouse) {
		const background = gruppe.elemente[0] as Rect;
		text.position = background.position;
	}
}