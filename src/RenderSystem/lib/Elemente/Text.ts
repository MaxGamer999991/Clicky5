import { Vector2, Color } from "../std.js";

export class _Text {
	position = new Vector2(0, 0);
	size = 30;
	color = new Color("rgba(255, 255, 255, 1)");

	text = "Hi";

	animation = {
		position: new Vector2(0, 0),
		dPosition: new Vector2(0, 0),
		size: 0,
		dSize: 0,
		color: new Color(0, 0, 0, 0)
	};

	constructor() { }

	render(ctx: CanvasRenderingContext2D, dt: number) {
		ctx.globalAlpha = 1;
		ctx.fillStyle = this.animation.color.style;
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = Math.floor(this.animation.size) + "px monospace";
		ctx.fillText(
			this.text,
			(ctx.canvas.width / 2) + this.animation.position.x,
			(ctx.canvas.height / 2) - this.animation.position.y
		);

		if ((window as any).DEBUG) {
			ctx.fillStyle = "rgba(43, 243, 103, 0.3)";
			ctx.font = Math.floor(this.size) + "px monospace";
			const mess = ctx.measureText(this.text).width;
			ctx.fillRect(
				(ctx.canvas.width / 2) + this.position.x - (mess / 2),
				(ctx.canvas.height / 2) - this.position.y - (this.size / 2),
				mess,
				this.size
			);
			ctx.strokeStyle = "rgba(255, 0, 0, 0.3)";
			ctx.lineWidth = 10;
			ctx.beginPath();
			ctx.moveTo(
				(ctx.canvas.width / 2) + this.animation.position.x,
				(ctx.canvas.height / 2) - this.animation.position.y
			);
			ctx.lineTo(
				(ctx.canvas.width / 2) + this.animation.position.x + (this.animation.dPosition.x * 1),
				(ctx.canvas.height / 2) - this.animation.position.y - (this.animation.dPosition.y * 1)
			);
			ctx.stroke();
			ctx.lineWidth = 1;
			ctx.lineTo(
				(ctx.canvas.width / 2) + this.animation.position.x + (this.animation.dPosition.x * 10),
				(ctx.canvas.height / 2) - this.animation.position.y - (this.animation.dPosition.y * 10)
			);
			ctx.stroke();
		}

		const animation = this.animation;

		this.animation.position = animation.position.add(animation.dPosition.mul(dt * 10));
		this.animation.dPosition = this.position.sub(animation.position).div(2);

		this.animation.size = animation.size + (animation.dSize * (dt * 10));
		this.animation.dSize = (this.size - animation.size) / 2;

		this.animation.color = this.color.durchschnit(animation.color, 9);
	}
}
