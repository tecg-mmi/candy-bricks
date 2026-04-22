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
        let currentX = settings.bricks.gap;
        let currentY = settings.bricks.gap;
        this.ctx = ctx;
        this.sprite = sprite;
        for (let i = 0; i < settings.bricks.rows; i++) {
            for (let j = 0; j < settings.bricks.cols; j++) {
                const brick = new Brick(this.ctx, this.sprite, new Frame(settings.bricks.frame)
                );
                brick.frame.dx = currentX;
                brick.frame.dy = currentY;
                this.bricks.push(brick);
                currentX += settings.bricks.frame.sw + settings.bricks.gap;
            }
            currentY += settings.bricks.frame.sh + settings.bricks.gap;
            currentX = settings.bricks.gap;
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