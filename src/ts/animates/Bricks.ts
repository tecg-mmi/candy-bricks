import {IAnimatable} from "../framework26/interfaces/IAnimatable";
import {Brick} from "./Brick";
import {settings} from "../settings";
import {Frame} from "../framework26/Frame";

export class Bricks implements IAnimatable {

    private readonly bricks: Brick[];

    constructor(ctx: CanvasRenderingContext2D, sprite: HTMLImageElement) {

        this.bricks = [];


        for (let i = 0; i < settings.bricks.rows; i++) {
            for (let j = 0; j < settings.bricks.cols; j++) {
                const tmp = new Brick(
                    ctx,
                    sprite,
                    new Frame(settings.bricks.frame)
                );


                tmp.frame.dx = j*10;
                tmp.frame.dy = i*10;


                console.log(tmp.frame.dx, tmp.frame.dy);

                this.bricks.push(tmp);
            }

        }
    }

    animate(): void {
        this.bricks.forEach((brick) => {
            brick.animate();
        });
    }

}