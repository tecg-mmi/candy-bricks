import {IOrigin} from "../interfaces/IOrigin";

export class Vector implements IOrigin {
    x: number;
    y: number;


    constructor(position: IOrigin) {
        this.x = position.x;
        this.y = position.y;
    }

    add(position: IOrigin) {
        this.x += position.x;
        this.y += position.y;
    }

    subtract(position: IOrigin) {
        this.x -= position.x;
        this.y -= position.y;
    }

    multiply(coefficient: number) {
        this.x *= coefficient;
        this.y *= coefficient;
    }

    static fromAngle(angle: number, length: number = 1): Vector {
        return new Vector({
            x: Math.cos(angle) * length,
            y: Math.sin(angle) * length,
        })
    }

}