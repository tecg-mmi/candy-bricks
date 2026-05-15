import {GameStatus} from "./framework26/GameStatus";

export class MyGameStatus extends GameStatus {
    public nbBricks: number;


    constructor() {
        super();
        this.nbBricks = 0;
    }
}