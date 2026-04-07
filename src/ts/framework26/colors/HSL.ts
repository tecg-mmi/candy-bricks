export class HSL {
    public readonly h: number;
    public readonly s: number;
    public readonly l: number;

    constructor(h: number, s: number, l: number) {
        this.h = ((h % 360) + 360) % 360;
        this.s = Math.max(0, Math.min(100, s));
        this.l = Math.max(0, Math.min(100, l));
    }

    toString(): string {
        return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
    }
}
