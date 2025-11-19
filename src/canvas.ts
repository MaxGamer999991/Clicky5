export function init() {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d")!;
	function resize() {
		canvas.width = innerWidth;
		canvas.height = innerHeight;
	}
	addEventListener("resize", resize);
	resize();
	document.body.append(canvas);
	return ctx;
}