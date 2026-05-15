import {Paddle} from "./Paddle";
import {Bricks} from "./Bricks";
import {MyGameStatus} from "../MyGameStatus";

export interface IBall {
    readonly gameStatus: MyGameStatus;
    readonly paddle: Paddle;
    readonly bricks: Bricks;
    readonly ctx: CanvasRenderingContext2D;
    readonly updateScore: () => void;
    readonly reduceLives: () => void;
}