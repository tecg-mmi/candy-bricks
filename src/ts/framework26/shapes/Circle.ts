import {Shape} from "./Shape";
import {IDrawable} from "../interfaces/IDrawable";
import {ICircle} from "../interfaces/shapes/ICircle";

export class Circle extends Shape implements ICircle, IDrawable {
    public radius: number;

    constructor(circle: ICircle) {
        super({ctx: circle.ctx, origin: circle.origin, color: circle.color, rotation: circle.rotation, stroke: circle.stroke});
        this.radius = circle.radius;
    }

    draw() {
        this.ctx.save();
        this.rotateAndTranslate()
        this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        this.fillAndStroke();
        this.ctx.restore();
    }
}
