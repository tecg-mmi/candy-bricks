import {IDrawable} from "../interfaces/IDrawable";
import {ISquare} from "../interfaces/shapes/ISquare";
import {Shape} from "./Shape";

export class Square extends Shape implements ISquare, IDrawable {
    public readonly size: number;

    constructor(square: ISquare) {
        super({ctx: square.ctx, origin: square.origin, color: square.color});
        this.size = square.size;
    }

    draw() {
        this.ctx.save();
        this.rotateAndTranslate();
        this.ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
        this.fillAndStroke();
        this.ctx.restore();
    }

}