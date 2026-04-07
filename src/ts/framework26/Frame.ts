import {IFrame} from "./interfaces/IFrame";

export class Frame implements IFrame {
    dx: number;
    dy: number;
    dh: number;
    dw: number;
    sh: number;
    sw: number;
    sx: number;
    sy: number;


    constructor(frame: IFrame) {
        this.dx = frame.dx;
        this.dy = frame.dy;
        this.dw = frame.dw;
        this.dh = frame.dh;

        this.sx = frame.sx;
        this.sy = frame.sy;
        this.sw = frame.sw;
        this.sh = frame.sh;
    }
}