import { Gruppe, Rect, Text } from "./RenderSystem/lib/Elemente.js";
import { Color, Vector2 } from "./RenderSystem/lib/std.js";
class Title {
    gruppe;
    background;
    text;
    appearance = {
        background: new Color("rgba(92, 92, 92, 1)"),
        button: new Color("rgba(53, 53, 53, 1)"),
        text: new Color("rgba(255, 255, 255, 1)")
    };
    constructor(parent, ctx) {
        this.gruppe = new Gruppe();
        this.gruppe.name = "Title";
        this.background = new Rect();
        this.background.animation.position = new Vector2(0, ctx.canvas.height / 2);
        this.background.color = this.appearance.background.clone();
        this.text = new Text();
        this.text.animation.position = new Vector2(0, ctx.canvas.height / 2 - 40);
        this.text.text = "Clicky v5";
        parent.push(this.gruppe);
        this.gruppe.push(this.background);
        this.gruppe.push(this.text);
    }
    update(dt, ctx, mouse) {
        ctx.font = this.text.size + "px monospace";
        this.background.position = new Vector2(0, (ctx.canvas.height / 2) - (this.background.size.y / 2) - 20);
        this.background.size = new Vector2(ctx.measureText(this.text.text).width + 60, 60);
        this.text.position = new Vector2(0, (ctx.canvas.height / 2) - 50);
    }
}
class Power {
    gruppe;
    background;
    text;
    appearance = {
        background: new Color("rgba(92, 92, 92, 1)"),
        button: new Color("rgba(53, 53, 53, 1)"),
        text: new Color("rgba(255, 255, 255, 1)")
    };
    constructor(parent, ctx) {
        this.gruppe = new Gruppe();
        this.gruppe.name = "Power";
        this.background = new Rect();
        this.background.animation.position = new Vector2(0, ctx.canvas.height / 2);
        this.background.color = this.appearance.background.clone();
        this.text = new Text();
        this.text.animation.position = new Vector2(0, ctx.canvas.height / 2 - 40);
        this.text.text = "Power";
        parent.push(this.gruppe);
        this.gruppe.push(this.background);
        this.gruppe.push(this.text);
    }
    update(dt, ctx, mouse) {
        ctx.font = this.text.size + "px monospace";
        this.background.position = new Vector2(0, (ctx.canvas.height / 2) - (this.background.size.y / 2) - 20);
        this.background.size = new Vector2(ctx.measureText(this.text.text).width + 60, 60);
        this.text.position = new Vector2(0, (ctx.canvas.height / 2) - 50);
    }
}
class Coin {
    gruppe;
    background;
    text;
    appearance = {
        background: new Color("rgba(92, 92, 92, 1)"),
        button: new Color("rgba(53, 53, 53, 1)"),
        text: new Color("rgba(255, 255, 255, 1)")
    };
    constructor(parent, ctx) {
        this.gruppe = new Gruppe();
        this.gruppe.name = "Coin";
        this.background = new Rect();
        this.background.animation.position = new Vector2(0, ctx.canvas.height / 2);
        this.background.color = this.appearance.background.clone();
        this.text = new Text();
        this.text.animation.position = new Vector2(0, ctx.canvas.height / 2 - 40);
        this.text.text = "Coin";
        parent.push(this.gruppe);
        this.gruppe.push(this.background);
        this.gruppe.push(this.text);
    }
    update(dt, ctx, mouse) {
        ctx.font = this.text.size + "px monospace";
        this.background.position = new Vector2(0, (ctx.canvas.height / 2) - (this.background.size.y / 2) - 20);
        this.background.size = new Vector2(ctx.measureText(this.text.text).width + 60, 60);
        this.text.position = new Vector2(0, (ctx.canvas.height / 2) - 50);
    }
}
export class TopBar {
    gruppe;
    title;
    coin;
    power;
    appearance = {
        background: new Color("rgba(92, 92, 92, 1)"),
        button: new Color("rgba(53, 53, 53, 1)"),
        text: new Color("rgba(255, 255, 255, 1)")
    };
    constructor(parent, ctx) {
        this.gruppe = new Gruppe();
        this.gruppe.name = "TopBar";
        parent.push(this.gruppe);
        this.title = new Title(this.gruppe, ctx);
        this.coin = new Coin(this.gruppe, ctx);
        this.power = new Power(this.gruppe, ctx);
    }
    update(dt, ctx, mouse) {
        this.title.update(dt, ctx, mouse);
        this.power.update(dt, ctx, mouse);
        this.coin.update(dt, ctx, mouse);
    }
}
//# sourceMappingURL=topbar.js.map