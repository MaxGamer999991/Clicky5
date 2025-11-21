import { init as canvasInit } from "./canvas.js";
import { System } from "./RenderSystem/lib/module.js";
import { init as mouseInit, main as mouseMain } from "./RenderSystem/lib/mouse.js";
import { render as debug } from "./Debug.js";

const ctx = canvasInit();
const system = new System();
const mouse = mouseInit();

import { Taskbar } from "./RenderSystem/mod/taskbar.js";
import { _Image, Gruppe } from "./RenderSystem/lib/Elemente.js";
import { TopBar } from "./topbar.js";
import { Scene } from "./RenderSystem/mod/scene.js";

const sceneGruppe = new Gruppe();
sceneGruppe.name = "Scene"
system.push(sceneGruppe);
const scene = new Scene(sceneGruppe, ctx);

(async () => {
	scene.addScene((await import("./scene/home.js")).default, ctx);
	scene.addScene((await import("./scene/upgrades.js")).default, ctx);
	scene.addScene((await import("./scene/settings.js")).default, ctx);
})()

const taskbarGruppe = new Gruppe();
taskbarGruppe.name = "Taskbar"
system.push(taskbarGruppe);
const taskbar = new Taskbar(taskbarGruppe, ctx);
taskbar.onClick = () => scene.tab = taskbar.tab;
taskbar.push("Home");
taskbar.push("Upgrades");
taskbar.push("Settings");
const topbar = new TopBar(system, ctx);

let lastTime = 0;
function main() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

	const dt = (performance.now() - lastTime) / 1000;

	taskbar.update(dt, ctx, mouse);
	topbar.update(dt, ctx, mouse);
	system.render(ctx, dt);

	mouseMain();
	scene.update(dt, ctx, mouse);
	const url = window.location.hash.toLocaleLowerCase();
	(window as any).DEBUG = url.includes("debug") && !url.includes("!debug") && !url.includes("debug2");
	if (((window as any).DEBUG && !url.includes("debug1")) || (url.includes("debug2") && !url.includes("!debug2"))) debug(system, ctx);
	(window as any).mouse = mouse;
	(window as any).system = system;
	lastTime = performance.now();
	requestAnimationFrame(main);
}
main();
