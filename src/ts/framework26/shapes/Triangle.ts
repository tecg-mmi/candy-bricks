import {Shape} from "./Shape";
import {IDrawable} from "../interfaces/IDrawable";
import {ITriangle} from "../interfaces/shapes/ITriangle";

export class Triangle extends Shape implements ITriangle, IDrawable {
    public readonly base: number;
    public readonly height: number;

    constructor(triangle: ITriangle) {
        super({
            ctx: triangle.ctx,
            origin: triangle.origin,
            color: triangle.color,
            rotation: triangle.rotation,
            stroke: triangle.stroke
        });
        this.base = triangle.base;
        this.height = triangle.height;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.origin.x, this.origin.y);
        this.ctx.rotate(this.rotation);
        this.ctx.beginPath();
        this.ctx.moveTo(0, -this.height / 2);
        this.ctx.lineTo(this.base / 2, this.height / 2);
        this.ctx.lineTo(-this.base / 2, this.height / 2);
        this.ctx.closePath();
        this.fillAndStroke();
        this.ctx.restore();
    }


}
