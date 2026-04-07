import {HSL} from "./HSL";

export class HSLA extends HSL {
    public readonly a: number;

    constructor(h: number, s: number, l: number, a: number) {
        super(h, s, l);
        this.a = Math.max(0, Math.min(1, a));
    }

    toString(): string {
        return `hsla(${this.h}, ${this.s}%, ${this.l}%, ${this.a})`;
    }
}
