import {Rectangle} from "../framework26/shapes/Rectangle";
import {IAnimatable} from "../framework26/interfaces/IAnimatable";
import {settings} from "../settings";
import {KeyController} from "../framework26/KeyController";
import {Vector} from "../framework26/Math/Vector";

export class Paddle extends Rectangle implements IAnimatable {
    private readonly keyController: KeyController;
    private readonly speed: Vector;

    constructor(ctx: CanvasRenderingContext2D, keyController: KeyController) {
        super({
            color: settings.paddle.color.toString(),
            ctx: ctx,
            height: settings.paddle.height,
            width: settings.paddle.width,
            origin: new Vector({
                x: ctx.canvas.width / 2,
                y: ctx.canvas.height - (settings.paddle.height / 2) - settings.paddle.margin
            }),
        });
        this.keyController = keyController;
        this.speed = new Vector({x: 0, y: 0});

    }

    animate(): void {
        this.handleKeys();
        this.speed.multiply(settings.paddle.friction);
        this.origin.add(this.speed);
        this.draw();
        this.checkCollisionsWithCanvas();
    }

    private handleKeys() {
        if (!this.isOutCanvasRight() && !this.isOutCanvasLeft()) {
            if (this.keyController.currentKeys.includes(settings.keys.left)) {
                this.speed.x -= settings.paddle.speed;
            } else if (this.keyController.currentKeys.includes(settings.keys.right)) {
                this.speed.x += settings.paddle.speed;
            }
        }
    }

    private checkCollisionsWithCanvas() {
        if (this.isOutCanvasLeft()) {
            this.speed.x *= -1
        } else if (this.isOutCanvasRight()) {
            this.speed.x *= -1
        }
    }

    private isOutCanvasRight() {
        return this.origin.x >= this.ctx.canvas.width - settings.paddle.margin - this.width / 2;
    }

    private isOutCanvasLeft() {
        return this.origin.x <= settings.paddle.margin + this.width / 2;
    }
}