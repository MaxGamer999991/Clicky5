import { Vector2, Color } from "../std.js";

export class Rect {
	position = new Vector2(0, 0);
	size = new Vector2(100, 100);
	color = new Color("rgba(255, 255, 255, 1)");
	round = 0;

	animation = {
		position: new Vector2(0, 0),
		dPosition: new Vector2(0, 0),
		size: new Vector2(0, 0),
		dSize: new Vector2(0, 0),
		color: new Color(0, 0, 0, 0),
		round: 0
	};

	constructor() { }

	render(ctx: CanvasRenderingContext2D, dt: number) {
		ctx.globalAlpha = 1;
		ctx.fillStyle = this.animation.color.style;
		ctx.beginPath();
		if (Math.floor(this.animation.round) == 0) {
			ctx.rect(
				(ctx.canvas.width / 2) + this.animation.position.x - (this.animation.size.x / 2),
				(ctx.canvas.height / 2) - this.animation.position.y - (this.animation.size.y / 2),
				this.animation.size.x,
				this.animation.size.y
			);
		} else {
			ctx.roundRect(
				(ctx.canvas.width / 2) + this.animation.position.x - (this.animation.size.x / 2),
				(ctx.canvas.height / 2) - this.animation.position.y - (this.animation.size.y / 2),
				this.animation.size.x,
				this.animation.size.y,
				this.animation.round
			);
		}
		ctx.fill();

		if ((window as any).DEBUG) {
			ctx.fillStyle = "rgba(43, 89, 243, 0.3)";
			ctx.fillRect(
				(ctx.canvas.width / 2) + this.position.x - (this.size.x / 2),
				(ctx.canvas.height / 2) - this.position.y - (this.size.y / 2),
				this.size.x,
				this.size.y
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

		this.animation.size = animation.size.add(animation.dSize.mul(dt * 10));
		this.animation.dSize = this.size.sub(animation.size).div(2);

		this.animation.color = this.color.durchschnit(animation.color, 9);
		this.animation.round = ((animation.round * 9) + this.round) / 10;
	}
}
