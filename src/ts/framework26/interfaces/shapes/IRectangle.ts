import {IShape} from "./IShape";

export interface IRectangle extends IShape {
    readonly width: number;
    readonly height: number;
}