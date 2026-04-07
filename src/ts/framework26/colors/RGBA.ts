import {RGB} from "./RGB";

export class RGBA extends RGB {
    public readonly a: number;

    constructor(r: number, g: number, b: number, a: number) {
        super(r, g, b);
        this.a = Math.max(0, Math.min(1, a));
    }

    toString(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}
