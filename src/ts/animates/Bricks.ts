import {IAnimatable} from "../framework26/interfaces/IAnimatable";
import {Brick} from "./Brick";
import {Frame} from "../framework26/Frame";
import {settings} from "../settings";
import {IDrawable} from "../framework26/interfaces/IDrawable";

export class Bricks implements IAnimatable, IDrawable {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly sprite: HTMLImageElement;
    private readonly bricks: Brick[] = [];

    constructor(ctx: CanvasRenderingContext2D, sprite: HTMLImageElement) {
        this.ctx = ctx;
        this.sprite = sprite;

        for (let i = 0; i < settings.bricks.rows; i++) {
            for (let j = 0; j < settings.bricks.cols; j++) {
                const brick = new Brick(this.ctx, this.sprite, new Frame(settings.bricks.frame)
                );

                //brick.frame.dx =
                //brick.frame.dy =

                this.bricks.push(brick);
            }
        }


    }

    animate(): void {
        this.bricks.forEach((brick: Brick) => {
            brick.animate();
        });
    }

    draw(): void {
        this.bricks.forEach((brick: Brick) => {
            brick.draw();
        });
    }


}