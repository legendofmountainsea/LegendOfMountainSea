export default class Controller {
    constructor() {
        this._pawn = null;
        this._bindKeyboardEvent();
    }

    _bindKeyboardEvent() {
        document.addEventListener('keyup', this._onKeyDown.bind(this), false);
    }

    _onKeyDown(event) {
        const keyName = event.key;

        // As the user release the Ctrl key, the key is no longer active.
        // So event.ctrlKey is false.
        if (keyName === 'Control') {
            console.log('Control key was released');
        }
    }

    onMouseDown(e) {
        if (this._pawn) {
            this._pawn.onMouseDown(e);
        }
    }

    possess(pawn) {
        this._pawn = pawn;
    }
}