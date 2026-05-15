import {GameStatus} from "./framework26/GameStatus";
import {settings} from "./settings";

export class MyGameStatus extends GameStatus {
    public nbBricks: number;
    public lives: number;


    constructor() {
        super();
        this.nbBricks = 0;
        this.lives = settings.maxLives;
    }
}