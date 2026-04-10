import {GameStatus} from "./framework26/GameStatus";
import {Loop} from "./framework26/core/Loop";
import {settings} from "./settings";
import {Paddle} from "./animates/Paddle";
import {IAnimatable} from "./framework26/interfaces/IAnimatable";
import {KeyController} from "./framework26/KeyController";
import {Ball} from "./animates/Ball";

class Main {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;
    private readonly sprite: HTMLImageElement;
    private readonly gameStatus: GameStatus;
    private readonly keyController: KeyController;
    private readonly loop: Loop;
    private readonly paddle: Paddle;
    private readonly ball: Ball;
    private readonly animates: IAnimatable[] = [];

    constructor() {
        this.canvas = document.getElementById(settings.canvasID) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.sprite = new Image();
        this.sprite.src = settings.spriteSrc;
        this.gameStatus = new GameStatus();

        this.keyController = new KeyController([settings.keys.left, settings.keys.right], () => {
            this.gameStatus.hasStarted = true;
        });
        this.ball = new Ball(this.ctx);
        this.paddle = new Paddle(this.ctx, this.keyController);

        this.animates.push(this.paddle, this.ball);

        this.loop = new Loop(() => {
            this.animate();
        });

        this.sprite.addEventListener('load', () => {
            this.loop.start();
        });

    }

    private animate() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.animates.forEach((objToAnimate: IAnimatable) => {
            objToAnimate.animate();
        });
    }
}

new Main();