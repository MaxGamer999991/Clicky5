import { _Text } from "../RenderSystem/lib/Elemente.js";
import { Color } from "../RenderSystem/lib/std.js";
export default function main(parent) {
    parent.elemente[0].color = new Color("rgba(15, 15, 15, 1)");
    const text = new _Text();
    text.text = "Home";
    parent.push(text);
}
//# sourceMappingURL=home%20copy.js.map