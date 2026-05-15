import {Paddle} from "./animates/Paddle";
import {Loop} from "./framework26/core/Loop";
import {IAnimatable} from "./framework26/interfaces/IAnimatable";
import {settings} from "./settings";
import {KeyController} from "./framework26/KeyController";
import {Ball} from "./animates/Ball";
import {Bricks} from "./animates/Bricks";
import {MyGameStatus} from "./MyGameStatus";

class Main {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly scoreElement: HTMLElement;
    private readonly canvas: HTMLCanvasElement;
    private livesElement: HTMLElement;
    private readonly paddle: Paddle;
    private readonly ball: Ball;
    private readonly sprite: HTMLImageElement;
    private readonly loop: Loop;
    private readonly keyController: KeyController;
    private readonly gameStatus: MyGameStatus;
    private readonly iAnimates: IAnimatable[] = [];
    private isLoaded = false;
    private readonly bricks: Bricks;
    private dialogElement: HTMLDialogElement;
    private templatePauseFragment: HTMLTemplateElement;

    constructor() {
        this.canvas = document.getElementById(settings.canvasID) as HTMLCanvasElement;
        this.scoreElement = document.getElementById(settings.scoreID);
        this.livesElement = document.getElementById(settings.livesID);
        this.dialogElement = document.getElementById('dialog') as HTMLDialogElement;
        this.templatePauseFragment = document.getElementById(settings.pauseTemplateID) as HTMLTemplateElement;

        this.ctx = this.canvas.getContext('2d');

        this.gameStatus = new MyGameStatus();
        this.keyController = new KeyController(
            [settings.keys.right, settings.keys.left]
        );


        this.sprite = new Image();
        this.sprite.src = settings.spriteSrc;

        this.bricks = new Bricks(this.ctx, this.sprite);

        this.paddle = new Paddle(this.ctx, this.keyController);

        this.ball = new Ball({
            ctx: this.ctx,
            bricks: this.bricks,
            gameStatus: this.gameStatus,
            paddle: this.paddle,
            reduceLives: () => {
                this.reduceLives();
            },
            updateScore: this.updateScore.bind(this)
        });


        this.iAnimates.push(this.paddle, this.ball, this.bricks);

        this.loop = new Loop(() => {
            this.animate();
        });

        this.sprite.addEventListener('load', () => {
            this.isLoaded = true;
            this.draw();
        });

        window.addEventListener('keydown', (evt) => {
            this.start(evt);
        });

    }

    private start(evt: KeyboardEvent) {
        if (this.isLoaded && evt.code === settings.keys.space) {
            this.pause();
        }
    }

    private pause() {
        if (this.gameStatus.hasStarted) {
            this.loop.stop();
            this.showPauseDialog();
        } else {
            this.loop.start();
            this.dialogElement.close();
        }
        this.gameStatus.hasStarted = !this.gameStatus.hasStarted;

    }

    private draw() {
        this.iAnimates.forEach((objToAnimate) => {
            // @ts-ignore
            objToAnimate.draw();
        });
    }

    private reduceLives() {
        this.livesElement.textContent = this.livesElement.textContent.substring(1);
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


    private updateScore() {
        this.gameStatus.nbBricks++;
        this.scoreElement.textContent = this.gameStatus.nbBricks + "";

    }


    private showPauseDialog() {
        this.dialogElement.replaceChildren(this.templatePauseFragment.content.cloneNode(true))
        this.dialogElement.showModal();
    }
}

new Main();