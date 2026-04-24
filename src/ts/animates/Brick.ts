import {Sprite} from "../framework26/Sprite";
import {IAnimatable} from "../framework26/interfaces/IAnimatable";
import {IFrame} from "../framework26/interfaces/IFrame";
import {settings} from "../settings";

export class Brick extends Sprite implements IAnimatable {
    height: number;
    width: number;
    active: boolean = true;

    constructor(ctx: CanvasRenderingContext2D, sprite: HTMLImageElement, frame: IFrame) {

        super({
            frame: frame,
            sprite: sprite,
            ctx: ctx
        });
        this.width = settings.bricks.frame.sw;
        this.height = settings.bricks.frame.sh;
    }

    animate(): void {
        if (this.active) {
            this.draw();
        }
    }


}