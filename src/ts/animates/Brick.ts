import {Sprite} from "../framework26/Sprite";
import {IAnimatable} from "../framework26/interfaces/IAnimatable";
import {IFrame} from "../framework26/interfaces/IFrame";

export class Brick extends Sprite implements IAnimatable {
    active: boolean;

    constructor(ctx: CanvasRenderingContext2D, sprite: HTMLImageElement, frame: IFrame) {
        super({
            frame: frame,
            sprite: sprite,
            ctx: ctx
        });
        this.active = true;
    }

    animate(): void {
        if (this.active) {
            this.draw();
        }
    }

}