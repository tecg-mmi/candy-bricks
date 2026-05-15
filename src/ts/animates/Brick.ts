import {Sprite} from "../framework26/Sprite";
import {IAnimatable} from "../framework26/interfaces/IAnimatable";
import {settings} from "../settings";
import {IBrick} from "./IBrick";

export class Brick extends Sprite implements IAnimatable {
    height: number;
    width: number;
    active: boolean = true;

    constructor(brick: IBrick) {

        super({
            frame: brick.frame,
            sprite: brick.sprite,
            ctx: brick.ctx
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