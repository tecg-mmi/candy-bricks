import {GameStatus} from "./framework26/GameStatus";
import {Paddle} from "./animates/Paddle";
import {Bricks} from "./animates/Bricks";

export interface IBall {
    readonly gameStatus: GameStatus;
    readonly paddle: Paddle;
    readonly bricks: Bricks;
    readonly reduceLives: () => void;
    readonly ctx:CanvasRenderingContext2D

}