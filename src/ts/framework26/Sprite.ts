import {IFrame} from "./interfaces/IFrame";
import {ISprite} from "./interfaces/ISprite";
import {IDrawable} from "./interfaces/IDrawable";

export class Sprite implements IDrawable {
    ctx: CanvasRenderingContext2D;
    sprite: HTMLImageElement;
    frame: IFrame;

    constructor(sprite: ISprite) {
        this.ctx = sprite.ctx;
        this.sprite = sprite.sprite;
        this.frame = sprite.frame;
    }

    draw() {
        this.ctx.drawImage(
            this.sprite,

            this.frame.sx,
            this.frame.sy,
            this.frame.sw,
            this.frame.sh,

            this.frame.dx,
            this.frame.dy,
            this.frame.dw,
            this.frame.dh,
        );
    }
}