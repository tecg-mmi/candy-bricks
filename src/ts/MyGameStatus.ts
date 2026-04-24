import {GameStatus} from "./framework26/GameStatus";
import {settings} from "./settings";

export class MyGameStatus extends GameStatus {
    public lives: number;
    public isPaused: boolean;

    constructor() {
        super();
        this.lives = settings.maxLives;
    }
}