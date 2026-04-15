export class KeyController {
    public currentKeys: string[] = [];
    private _allowedKeys: string[];
    private readonly _runWhenStarted?: () => void;
    private _isStarted: boolean = false;

    constructor(allowedKeys: string[], runWhenStart?: () => void) {
        this._allowedKeys = allowedKeys;
        this._runWhenStarted = runWhenStart;
        window.addEventListener('keydown', (evt) => {
            this.keyDown(evt);
        });
        window.addEventListener('keyup', (evt) => {
            this.keyUp(evt);
        });
    }

    private keyDown(evt: KeyboardEvent) {
        if (this._allowedKeys.includes(evt.code)) {
            if (!this._isStarted) {
                this._isStarted = true;
                if (this._runWhenStarted) {
                    this._runWhenStarted();
                }
            }

            if (this.currentKeys.indexOf(evt.key) === -1) {
                this.currentKeys.push(evt.key);
            }
        }
    }

    private keyUp(evt: KeyboardEvent) {
        if (this._allowedKeys.includes(evt.key)) {
            this.currentKeys.splice(this.currentKeys.indexOf(evt.key), 1)
        }
    }
}