import {IStroke} from "../interfaces/IStroke";
import {IShape} from "../interfaces/shapes/IShape";
import {Vector} from "../Math/Vector";

export abstract class Shape implements IShape {
    public readonly ctx: CanvasRenderingContext2D;
    public readonly origin: Vector;
    public color: string;
    public rotation: number;
    public readonly stroke?: IStroke;

    protected constructor(shape: IShape) {
        this.ctx = shape.ctx;
        this.origin = new Vector(shape.origin);
        this.color = shape.color;
        this.rotation = shape.rotation ?? 0;
        this.stroke = shape.stroke;
    }

    protected fillAndStroke() {
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        if (this.stroke) {
            this.ctx.strokeStyle = this.stroke.color;
            this.ctx.lineWidth = this.stroke.width;
            this.ctx.stroke();
        }

    }

    protected rotateAndTranslate() {
        this.ctx.translate(this.origin.x, this.origin.y);
        this.ctx.rotate(this.rotation);
        this.ctx.beginPath();

    }
}