import {IFrame} from "./IFrame";

export interface ISprite {
    ctx: CanvasRenderingContext2D;
    sprite: HTMLImageElement;
    frame: IFrame;
}