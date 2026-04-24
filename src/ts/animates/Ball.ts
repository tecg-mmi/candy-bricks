import {Circle} from "../framework26/shapes/Circle";
import {IAnimatable} from "../framework26/interfaces/IAnimatable";
import {settings} from "../settings";
import {Vector} from "../framework26/Math/Vector";
import {Random} from "../framework26/Math/Random";
import {GameStatus} from "../framework26/GameStatus";
import {Paddle} from "./Paddle";
import {Collision} from "../framework26/Math/Collision";
import {Bricks} from "./Bricks";
import {Brick} from "./Brick";
import {IBall} from "../IBall";

export class Ball extends Circle implements IAnimatable, IBall {
    direction: number;
    readonly gameStatus: GameStatus;
    readonly paddle: Paddle;
    readonly bricks: Bricks;
    readonly reduceLives: () => void;

    constructor(ball: IBall) {
        super({
                color: settings.ball.color.toString(),
                ctx: ball.ctx,
                origin: new Vector({
                    x: ball.ctx.canvas.width / 2,
                    y: ball.paddle.origin.y - (ball.paddle.height / 2) - settings.ball.radius
                }),
                radius: settings.ball.radius
            }
        );
        this.direction = -Random.nextFloat(settings.ball.direction);
        this.gameStatus = ball.gameStatus;
        this.paddle = ball.paddle;
        this.bricks = ball.bricks;
        this.reduceLives = ball.reduceLives;
    }

    animate(): void {
        this.update();
        this.draw();
    }

    private update() {
        this.origin.add(Vector.fromAngle(this.direction, settings.ball.speed));
        this.checkCollisionsWithPaddle();
        this.checkCollisionsWithBricks();
        this.checkCollisionsWithCanvas();
    }

    private checkCollisionsWithCanvas() {
        if (this.origin.y <= this.radius) {
            this.direction *= -1;
        } else if (this.origin.x >= this.ctx.canvas.width - this.radius || this.origin.x <= this.radius) {
            this.direction -= Math.PI;
        } else if (this.origin.y >= this.ctx.canvas.height + this.radius) {
            this.gameStatus.gameOver = true;
            this.reduceLives();
        }
    }

    private checkCollisionsWithPaddle() {
        if (Collision.isCircleInRectangle(this, this.paddle)) {
            this.direction *= -1;
        }
    }

    private checkCollisionsWithBricks() {
        this.bricks.brickElements.filter((brick: Brick) => {
            return brick.active;
        }).forEach((brick: Brick) => {
            if (Collision.isCircleInRectangle(this, {
                height: brick.height,
                width: brick.width,
                origin: {
                    x: brick.frame.dx + brick.width / 2,
                    y: brick.frame.dy + brick.height / 2
                }
            })) {
                brick.active = false;
                this.bounceOnBrick(brick)
            }
        });
    }

    private bounceOnBrick(brick: Brick) {
        const offsetTop = (this.origin.y + this.radius) - brick.frame.dy;
        const offsetRight = (brick.frame.dx + brick.frame.sw) - this.origin.x - this.radius;
        const offsetLeft = (this.origin.x + this.radius) - brick.frame.dx;
        const offsetBottom = (brick.frame.dy + brick.frame.sh) - this.origin.y - this.radius;

        const minOffset = Math.min(offsetTop, offsetBottom, offsetLeft, offsetRight);

        if (minOffset === offsetTop || minOffset === offsetBottom) {
            this.direction *= -1;
        } else {
            this.direction -= Math.PI;
        }


    }
}