import {Sprite} from "../framework26/Sprite";
import {IAnimatable} from "../framework26/interfaces/IAnimatable";
import {IFrame} from "../framework26/interfaces/IFrame";
import {IRectangle} from "../framework26/Math/Collision";
import {IOrigin} from "../framework26/interfaces/IOrigin";
import {settings} from "../settings";

export class Brick extends Sprite implements IAnimatable, IRectangle {
    height: number;
    origin: IOrigin;
    width: number;

    constructor(ctx: CanvasRenderingContext2D, sprite: HTMLImageElement, frame: IFrame) {

        super({
            frame: frame,
            sprite: sprite,
            ctx: ctx
        });

        this.width = settings.bricks.frame.sw;
        this.height = settings.bricks.frame.sh;

        this.origin = {
            x: this.frame.dx,
            y: this.frame.dy
        }
    }

    animate(): void {
        // TODO
        this.draw();
    }


}