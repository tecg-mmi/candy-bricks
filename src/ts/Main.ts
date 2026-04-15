import {Paddle} from "./animates/Paddle";
import {Loop} from "./framework26/core/Loop";
import {IAnimatable} from "./framework26/interfaces/IAnimatable";
import {settings} from "./settings";
import {KeyController} from "./framework26/KeyController";
import {GameStatus} from "./framework26/GameStatus";
import {Ball} from "./animates/Ball";
import {Bricks} from "./animates/Bricks";

class Main {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;
    private readonly paddle: Paddle;
    private readonly ball: Ball;
    private readonly sprite: HTMLImageElement;
    private readonly loop: Loop;
    private readonly keyController: KeyController;
    private readonly gameStatus: GameStatus;
    private readonly iAnimates: IAnimatable[] = [];
    private isLoaded = false;
    private readonly bricks: Bricks;

    constructor() {
        this.canvas = document.getElementById(settings.canvasID) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.gameStatus = new GameStatus();

        this.keyController = new KeyController(
            [settings.keys.right, settings.keys.left]
        );


        this.sprite = new Image();
        this.sprite.src = settings.spriteSrc;

        this.bricks = new Bricks(this.ctx, this.sprite);

        this.paddle = new Paddle(this.ctx, this.keyController);

        this.ball = new Ball(this.ctx, this.gameStatus, this.paddle);


        this.iAnimates.push(this.paddle, this.ball, this.bricks);

        this.loop = new Loop(() => {
            this.animate();
        });

        this.sprite.addEventListener('load', () => {
            this.isLoaded = true;
            this.draw();
        });


        window.addEventListener('keydown', (evt) => {
            if (!this.gameStatus.hasStarted && evt.code === settings.keys.space) {
                if (this.isLoaded) {
                    this.gameStatus.hasStarted = true;
                    this.loop.start();
                }
            }
        });
    }

    private draw() {
        this.iAnimates.forEach((objToAnimate) => {
            // @ts-ignore
            objToAnimate.draw();
        });
    }

    private animate() {

        if (this.gameStatus.gameOver) {
            this.loop.stop();

        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.iAnimates.forEach((objToAnimate) => {
                objToAnimate.animate();
            });
        }

    }
}

new Main();