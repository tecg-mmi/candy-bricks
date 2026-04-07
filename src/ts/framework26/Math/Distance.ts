import {IOrigin} from "../interfaces/IOrigin";

export class Distance {

    static euclidean(p1: IOrigin, p2: IOrigin): number {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
}