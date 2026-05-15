import {IFrame} from "../framework26/interfaces/IFrame";

export interface IBrick {
    ctx: CanvasRenderingContext2D;
    sprite: HTMLImageElement;
    frame: IFrame;

}