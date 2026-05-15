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
    private readonly livesElement: HTMLElement;
    private readonly paddle: Paddle;
    private readonly ball: Ball;
    private readonly sprite: HTMLImageElement;
    private readonly loop: Loop;
    private readonly keyController: KeyController;
    private readonly gameStatus: MyGameStatus;
    private readonly iAnimates: IAnimatable[] = [];
    private isLoaded = false;
    private readonly bricks: Bricks;
    private readonly dialogElement: HTMLDialogElement;
    private readonly templatePauseTemplate: HTMLTemplateElement;
    private readonly gameOverTemplate: HTMLTemplateElement;
    private playBtn: HTMLButtonElement;

    constructor() {
        this.canvas = document.getElementById(settings.canvasID) as HTMLCanvasElement;
        this.scoreElement = document.getElementById(settings.scoreID);
        this.livesElement = document.getElementById(settings.livesID);
        this.playBtn = document.getElementById(settings.playBtnID) as HTMLButtonElement;
        this.dialogElement = document.getElementById('dialog') as HTMLDialogElement;
        this.templatePauseTemplate = document.getElementById(settings.pauseTemplateID) as HTMLTemplateElement;

        this.gameOverTemplate = document.getElementById('lostTemplate') as HTMLTemplateElement;

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
        this.playBtn.addEventListener('click', () => {
            if (this.isLoaded) {
                this.pause();
            }
        });

    }

    private inversePlayPauseLabel() {
        [this.playBtn.textContent, this.playBtn.dataset.inverse] =
            [this.playBtn.dataset.inverse, this.playBtn.textContent]
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
        this.inversePlayPauseLabel();
    }

    private draw() {
        this.iAnimates.forEach((objToAnimate) => {
            // @ts-ignore
            objToAnimate.draw();
        });
    }

    private reduceLives() {
        this.livesElement.textContent = this.livesElement.textContent.substring(1);
        this.gameStatus.lives--;
        if (this.gameStatus.lives === 0) {
            this.gameOver();
        } else {
            this.playAgain();
        }
        this.loop.stop();
    }

    private animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.iAnimates.forEach((objToAnimate) => {
            objToAnimate.animate();
        });
    }

    private updateScore() {
        this.gameStatus.nbBricks++;
        this.scoreElement.textContent = this.gameStatus.nbBricks + "";

    }

    private showPauseDialog() {
        this.dialogElement.replaceChildren(this.templatePauseTemplate.content.cloneNode(true))
        this.dialogElement.showModal();
    }

    private gameOver() {
        this.dialogElement.replaceChildren(this.gameOverTemplate.content.cloneNode(true));
        this.dialogElement.querySelector(settings.nbBrickSelector).textContent = this.gameStatus.nbBricks.toString();
        this.dialogElement.showModal();
    }

    private playAgain() {
        //this.bricks.reset();
        //this.paddle.reset();
        this.ball.reset();
        this.gameStatus.hasStarted = false;
    }
}

new Main();