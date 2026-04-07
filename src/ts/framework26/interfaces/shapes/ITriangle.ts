import {IShape} from "./IShape";

export interface ITriangle extends IShape {
    readonly base: number;
    readonly height: number;
}
