import { _Text } from "../RenderSystem/lib/Elemente.js";
import { Color } from "../RenderSystem/lib/std.js";
export default function main(parent) {
    parent.elemente[0].color = new Color("rgba(15, 15, 15, 1)");
    parent.name = "Upgrades";
    const text = new _Text();
    text.text = "upgrades";
    parent.push(text);
    return function main(gruppe, dt, mouse) {
        const background = gruppe.elemente[0];
        text.position = background.position;
    };
}
//# sourceMappingURL=upgrades.js.map