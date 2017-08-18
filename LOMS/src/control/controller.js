export default class Controller {
    constructor() {
        this._pawn = null;
        this._bindKeyboardEvent();
    }

    _bindKeyboardEvent() {
        document.addEventListener('keyup', this._onKeyDown.bind(this), false);
    }

    _onKeyDown(event) {
        if (!this._pawn) {
            return;
        };

        const keyName = event.key;

        switch (keyName) {
            case 'a':
            case 'A':
                this._pawn.onPressKeyA(event);
                break;
            case 'b':
            case 'B':
                this._pawn.onPressKeyB(event);
            default:
                break;
        }
    }

    onMouseDown(e) {
        if (!this._pawn) {
            return;
        }
        this._pawn.onMouseDown(e);
    }

    possess(pawn) {
        this._pawn = pawn;
    }
}