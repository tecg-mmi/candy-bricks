import {Circle} from "../framework26/shapes/Circle";
import {IAnimatable} from "../framework26/interfaces/IAnimatable";
import {settings} from "../settings";
import {Vector} from "../framework26/Math/Vector";
import {Random} from "../framework26/Math/Random";
import {GameStatus} from "../framework26/GameStatus";
import {Paddle} from "./Paddle";
import {Collision} from "../framework26/Math/Collision";

export class Ball extends Circle implements IAnimatable {
    private direction: number;
    private readonly gameStatus: GameStatus;
    private readonly paddle: Paddle;

    constructor(ctx: CanvasRenderingContext2D, gameStatus: GameStatus, paddle: Paddle) {
        super({
            color: settings.ball.color.toString(),
            ctx: ctx,

            origin: new Vector({
                x: ctx.canvas.width / 2,
                y: ctx.canvas.height / 2
            }),

            radius: settings.ball.radius
        });
        this.direction = Random.nextFloat(settings.ball.initialDirection);
        this.gameStatus = gameStatus;
        this.paddle = paddle;
    }

    private update() {
        this.origin.add(Vector.fromAngle(this.direction, settings.ball.speed));
        this.checkCollisionsWithCanvas();
        this.checkCollisionsWithPaddle();
    }

    animate(): void {
        this.update();
        this.draw();
    }


    private checkCollisionsWithCanvas() {
        if (this.origin.y <= this.radius) {
            this.direction *= -1;
        } else if (this.origin.x >= this.ctx.canvas.width - this.radius || this.origin.x <= this.radius) {
            this.direction += Math.PI;
        } else if (this.origin.y >= this.ctx.canvas.height + this.radius) {
            this.gameStatus.gameOver = true;
        }
    }

    private checkCollisionsWithPaddle() {
        if (Collision.isCircleInRectangle(this, {
            width: this.paddle.width,
            height: this.paddle.height,
            origin: {
                x: this.paddle.origin.x - this.paddle.width / 2,
                y: this.paddle.origin.y - this.paddle.height / 2
            }
        })) {
            this.direction *= -1;
        }
    }
}