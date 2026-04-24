import {Loop} from "./framework26/core/Loop";
import {settings} from "./settings";
import {Paddle} from "./animates/Paddle";
import {IAnimatable} from "./framework26/interfaces/IAnimatable";
import {KeyController} from "./framework26/KeyController";
import {Ball} from "./animates/Ball";
import {Bricks} from "./animates/Bricks";
import {MyGameStatus} from "./MyGameStatus";

class Main {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;
    private readonly sprite: HTMLImageElement;
    private readonly gameStatus: MyGameStatus;
    private readonly keyController: KeyController;
    private readonly loop: Loop;
    private readonly paddle: Paddle;
    private readonly ball: Ball;
    private readonly animates: IAnimatable[] = [];
    private readonly bricks: Bricks;
    private isLoaded: boolean = false;
    private ddLiveElement: HTMLElement;

    constructor() {
        this.ddLiveElement = document.getElementById(settings.ddLiveID);
        this.canvas = document.getElementById(settings.canvasID) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.sprite = new Image();
        this.sprite.src = settings.spriteSrc;
        this.gameStatus = new MyGameStatus();


        this.bricks = new Bricks(this.ctx, this.sprite);

        this.keyController = new KeyController([settings.keys.left, settings.keys.right]);


        this.paddle = new Paddle(this.ctx, this.keyController);

        this.ball = new Ball(this.ctx, this.gameStatus, this.paddle, this.bricks, this.reduceLives.bind(this));


        this.animates.push(this.paddle, this.ball, this.bricks);

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

    private animate() {
        if (this.gameStatus.gameOver) {
            this.loop.stop();
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animates.forEach((objToAnimate: IAnimatable) => {
            objToAnimate.animate();
        });

    }

    private draw() {
        this.animates.forEach((objToAnimate: IAnimatable) => {
            // @ts-ignore
            objToAnimate.draw();
        });
    }

    private reduceLives() {
        if (this.gameStatus.lives === 0) {
            this.gameStatus.gameOver = true;
            return
        }
        this.gameStatus.lives--;
        this.ddLiveElement.textContent = this.ddLiveElement.textContent.slice(1);
    }
}

new Main();