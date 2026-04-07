import {IOrigin} from "../IOrigin";
import {IStroke} from "../IStroke";

export interface IShape {
    readonly ctx: CanvasRenderingContext2D;
    readonly origin: IOrigin;
    readonly color: string;
    readonly rotation?: number;
    readonly stroke?: IStroke;
}