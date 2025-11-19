export class System {
    elemente = [];
    constructor() { }
    push(element) {
        this.elemente.push(element);
    }
    splice(index) {
        if (index < 0 || index >= this.elemente.length)
            return;
        return this.elemente.splice(index);
    }
    render(ctx, dt) {
        for (let i = 0; i < this.elemente.length; i++) {
            this.elemente[i].render(ctx, dt);
        }
    }
}
//# sourceMappingURL=module.js.map