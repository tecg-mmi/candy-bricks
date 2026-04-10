import {Paddle} from "./animates/Paddle";
import {Loop} from "./framework26/core/Loop";
import {IAnimatable} from "./framework26/interfaces/IAnimatable";
import {settings} from "./settings";
import {KeyController} from "./framework26/KeyController";
import {GameStatus} from "./framework26/GameStatus";
import {Ball} from "./animates/Ball";

class Main {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;
    private readonly paddle: Paddle;
    private readonly ball: Ball;
    private readonly sprite: HTMLImageElement;
    private readonly loop: Loop;
    private keyController: KeyController;
    private gameStatus: GameStatus;
    private readonly iAnimates: IAnimatable[] = [];

    constructor() {
        this.canvas = document.getElementById(settings.canvasID) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.gameStatus = new GameStatus();

        this.keyController = new KeyController(
            [settings.keys.right, settings.keys.left],
            () => {
                this.gameStatus.hasStarted = true;
            }
        );

        this.sprite = new Image();
        this.sprite.src = settings.spriteSrc;

        this.paddle = new Paddle(this.ctx, this.keyController);
        this.ball = new Ball(this.ctx);

        this.iAnimates.push(this.paddle, this.ball);

        this.loop = new Loop(() => {
            this.animate();
        });

        this.sprite.addEventListener('load', () => {
            this.loop.start();
        });

    }

    private animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.iAnimates.forEach((objToAnimate) => {
            objToAnimate.animate();
        });
    }
}

new Main();