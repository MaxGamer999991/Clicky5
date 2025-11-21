import { Gruppe, Rect } from "../lib/Elemente.js";
import { Vector2 } from "../lib/std.js";
export class Scene {
    parent;
    scenen = [];
    tab = 0;
    constructor(parent, ctx) {
        this.parent = parent;
    }
    addScene(input, ctx) {
        const gruppe = new Gruppe();
        this.parent.push(gruppe);
        const background = new Rect();
        background.position = new Vector2(0, 0);
        background.size = new Vector2(ctx.canvas.width, ctx.canvas.height);
        gruppe.elemente[0] = background;
        this.scenen.push([gruppe, input(gruppe), background]);
    }
    update(dt, ctx, mouse) {
        this.scenen.forEach(([gruppe, func, background], i) => {
            background.position = new Vector2((i - this.tab) * ctx.canvas.width, 0);
            background.size = new Vector2(ctx.canvas.width, ctx.canvas.height);
            gruppe.elemente[0] = background;
            if (func)
                func(gruppe, dt, mouse);
        });
    }
}
//# sourceMappingURL=scene.js.map