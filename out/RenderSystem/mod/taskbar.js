import { Rect, Text } from "../lib/Elemente.js";
import { Color, Vector2 } from "../lib/std.js";
let width = 0;
export class Taskbar {
    elmente = [];
    appearance = {
        background: new Color("rgba(92, 92, 92, 1)"),
        button: new Color("rgba(53, 53, 53, 1)"),
        text: new Color("rgba(255, 255, 255, 1)")
    };
    gruppe;
    parent;
    tab = 0;
    events = [];
    constructor(system, ctx) {
        this.gruppe = new Rect();
        this.gruppe.color = this.appearance.background;
        this.gruppe.position = new Vector2(0, (-ctx.canvas.height / 2) + 45);
        this.gruppe.animation.position = new Vector2(0, -ctx.canvas.height / 2);
        this.gruppe.round = 25;
        system.elemente.push(this.gruppe);
        this.parent = system;
    }
    push(name) {
        const tab = new Rect();
        tab.animation.position = this.gruppe.animation.position
            .add(new Vector2(this.gruppe.animation.size.x / 2, 0));
        tab.color = this.appearance.button.clone();
        tab.round = 25;
        const tabText = new Text();
        tabText.animation.position = tab.animation.position;
        tabText.color = this.appearance.text.clone();
        tabText.size = 26;
        tabText.text = name;
        this.elmente.push([tab, tabText]);
        this.parent.push(tab);
        this.parent.push(tabText);
    }
    splice(value) {
        let e;
        if (typeof value == "number") {
            e = this.elmente[value];
        }
        else {
            e = this.elmente[this.elmente.findIndex(v => v[1].text == value)];
        }
        if (!e)
            return;
        const tab = this.parent.elemente[this.parent.elemente.indexOf(e[0])];
        const tabText = this.parent.elemente[this.parent.elemente.indexOf(e[1])];
        tab.size = new Vector2(0, 0);
        tabText.size = 0;
        tab.color.a = 0;
        tabText.color.a = 0;
    }
    set onClick(func) {
        this.events.push(func);
    }
    update(dt, ctx, mouse) {
        this.gruppe.position = new Vector2(0, (-ctx.canvas.height / 2) + 45);
        let x = -width / 2;
        width = -80;
        for (let i = 0; i < this.elmente.length; i++) {
            if (this.elmente[i][0].size.x == 0) {
                if (this.elmente[i][0].animation.size.x <= 0.1) {
                    this.parent.elemente.splice(this.parent.elemente.indexOf(this.elmente[i][0]), 1);
                    this.parent.elemente.splice(this.parent.elemente.indexOf(this.elmente[i][1]), 1);
                    this.elmente.splice(i, 1);
                    i--;
                }
                continue;
            }
            ctx.font = this.elmente[i][1].size + "px monospace";
            const mess = ctx.measureText(this.elmente[i][1].text).width;
            this.elmente[i][0].size = new Vector2(mess + 50, 35);
            this.elmente[i][0].position = new Vector2(x + (mess / 2), this.gruppe.position.y);
            this.elmente[i][1].position = new Vector2(x + (mess / 2), this.gruppe.position.y);
            if (mouse.position.inBox(this.elmente[i][0].position, this.elmente[i][0].size)) {
                this.elmente[i][0].size = this.elmente[i][0].size.add(new Vector2(35, 0));
                if (mouse.button.press) {
                    this.tab = i;
                    this.events.forEach(func => func());
                }
            }
            if (this.tab == i) {
                this.elmente[i][0].position = this.elmente[i][0].position.add(new Vector2(0, 30));
                this.elmente[i][0].color.a = 0;
                this.elmente[i][0].size = this.elmente[i][0].size.add(new Vector2(70, 0));
                this.elmente[i][1].position = this.elmente[i][1].position.add(new Vector2(0, 5));
            }
            else {
                this.elmente[i][0].color.a = 1;
            }
            x += mess + 80;
            width += mess + 80;
        }
        this.gruppe.size = new Vector2(Math.max(50, width) + 130, 50);
    }
}
//# sourceMappingURL=taskbar.js.map