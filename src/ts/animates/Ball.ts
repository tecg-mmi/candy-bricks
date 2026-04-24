import {Circle} from "../framework26/shapes/Circle";
import {IAnimatable} from "../framework26/interfaces/IAnimatable";
import {settings} from "../settings";
import {Vector} from "../framework26/Math/Vector";
import {Random} from "../framework26/Math/Random";
import {Paddle} from "./Paddle";
import {Collision} from "../framework26/Math/Collision";
import {Bricks} from "./Bricks";
import {Brick} from "./Brick";
import {MyGameStatus} from "../MyGameStatus";

export class Ball extends Circle implements IAnimatable {
    private direction: number;
    private readonly gameStatus: MyGameStatus;
    private readonly paddle: Paddle;
    private readonly bricks: Bricks;
    private readonly reduceLives: () => void;

    constructor(ctx: CanvasRenderingContext2D, gameStatus: MyGameStatus, paddle: Paddle, bricks: Bricks, reduceLives: () => void) {
        super({
            color: settings.ball.color.toString(),
            ctx: ctx,

            origin: new Vector({
                x: ctx.canvas.width / 2,
                y: paddle.origin.y - (paddle.height / 2) - settings.ball.radius
            }),

            radius: settings.ball.radius
        });
        this.direction = -Random.nextFloat(settings.ball.initialDirection);
        this.gameStatus = gameStatus;
        this.paddle = paddle;
        this.bricks = bricks;
        this.reduceLives = reduceLives;
    }

    private update() {
        this.origin.add(Vector.fromAngle(this.direction, settings.ball.speed));
        this.checkCollisionsWithPaddle();
        this.checkCollisionsWithBricks();
        this.checkCollisionsWithCanvas();
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
            this.reduceLives();
            //
            this.gameStatus.gameOver = true;
        }
    }

    private checkCollisionsWithPaddle() {
        if (Collision.isCircleInRectangle(this, this.paddle)) {
            this.direction *= -1;
        }
    }

    private checkCollisionsWithBricks() {
        this.bricks.brickArray.filter((brick: Brick) => {
            return brick.active;
        }).forEach((brick: Brick) => {
            if (Collision.isCircleInRectangle(this, {
                height: brick.frame.sh,
                width: brick.frame.sw,
                origin: {
                    x: brick.frame.dx + brick.frame.sw / 2,
                    y: brick.frame.dy + brick.frame.sh / 2
                }
            })) {
                this.bounceOnBrick(brick);
                brick.active = false;

            }
        });
    }

    private bounceOnBrick(brick: Brick) {
        const offsetTop = (this.origin.y + this.radius) - brick.frame.dy;
        const offsetBottom = (brick.frame.dy + brick.frame.sh) - (this.origin.y - this.radius);
        const offsetRight = (brick.frame.dx + brick.frame.sw) - (this.origin.x - this.radius);
        const offsetLeft = (this.origin.x + this.radius) - brick.frame.dx;

        const minOffset = Math.min(offsetTop, offsetBottom, offsetLeft, offsetRight);
        if (minOffset === offsetTop || minOffset === offsetBottom) {
            this.direction *= -1;
        } else {
            this.direction += Math.PI;
        }
    }
}