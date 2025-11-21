import { init as canvasInit } from "./canvas.js";
import { System } from "./RenderSystem/lib/module.js";
import { init as mouseInit, main as mouseMain } from "./RenderSystem/lib/mouse.js";
import { render as debug } from "./Debug.js";
const ctx = canvasInit();
const system = new System();
const mouse = mouseInit();
import { Taskbar } from "./RenderSystem/mod/taskbar.js";
import { Gruppe } from "./RenderSystem/lib/Elemente.js";
import { TopBar } from "./topbar.js";
const taskbarGruppe = new Gruppe();
taskbarGruppe.name = "Taskbar";
system.push(taskbarGruppe);
const taskbar = new Taskbar(taskbarGruppe, ctx);
taskbar.push("Home");
taskbar.push("Upgrades");
taskbar.push("Setings");
const topbar = new TopBar(system, ctx);
let lastTime = 0;
function main() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const dt = (performance.now() - lastTime) / 1000;
    taskbar.update(dt, ctx, mouse);
    topbar.update(dt, ctx, mouse);
    system.render(ctx, dt);
    mouseMain();
    const url = window.location.hash.toLocaleLowerCase();
    window.DEBUG = url.includes("debug") && !url.includes("!debug") && !url.includes("debug2");
    if ((window.DEBUG && !url.includes("debug1")) || (url.includes("debug2") && !url.includes("!debug2")))
        debug(system, ctx);
    window.mouse = mouse;
    window.system = system;
    lastTime = performance.now();
    requestAnimationFrame(main);
}
main();
//# sourceMappingURL=main.js.map