import {RGB} from "./framework26/colors/RGB";

export const settings = {
    keys: {
        left: 'ArrowLeft',
        right: 'ArrowRight',
        space: 'Space'
    },
    canvasID: 'gameCanvas',
    paddle: {
        speed: 1,
        friction: 0.95,
        margin: 15,
        height: 10,
        width: 100,
        color: new RGB(90, 46, 32)
    },
    ball: {
        speed: 3,
        radius: 10,
        color: new RGB(90, 46, 32),
        initialDirection: {min: Math.PI / 3, max: (Math.PI / 3) * 2}
    },
    bricks: {
        frame: {
            sx: 0,
            sy: 0,
            sw: 130,
            sh: 50,
            dx: 0,
            dy: 0,
            dw: 130,
            dh: 50
        },
        rows: 3,
        cols: 6,
        gap: 15
    },

    spriteSrc: 'src/img/sprite.png'
}