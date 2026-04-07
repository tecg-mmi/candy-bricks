export class GameStatus {
    hasStarted: boolean;
    gameOver: boolean;


    constructor() {
        this.gameOver = false;
        this.hasStarted = false;
    }
}