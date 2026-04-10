import {Rectangle} from "../framework26/shapes/Rectangle";
import {settings} from "../settings";
import {IAnimatable} from "../framework26/interfaces/IAnimatable";
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
                y: ctx.canvas.height - settings.paddle.margin - settings.paddle.height / 2
            }),
        });
        this.keyController = keyController;

        this.speed = new Vector({
            x: 0,
            y: 0
        });
    }

    animate(): void {
        this.update();
        this.draw();
    }

    private update() {
        this.handleKeys();

        this.speed.multiply(settings.paddle.friction);
        this.origin.add(this.speed);

        this.checkCollisionsWithCanvas();
    }

    private handleKeys() {
        if (this.keyController.currentKeys.includes(settings.keys.left)) {
            this.speed.x -= settings.paddle.speed;
        } else if (this.keyController.currentKeys.includes(settings.keys.right)) {
            this.speed.x += settings.paddle.speed;
        }
    }

    private checkCollisionsWithCanvas() {
        if (this.origin.x >= this.ctx.canvas.width - settings.paddle.margin - this.width / 2) {
            this.speed.multiply(-1);
        } else if (this.origin.x <= settings.paddle.margin + this.width / 2) {
            this.speed.multiply(-1);
        }
    }
}

