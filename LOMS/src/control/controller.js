export default class Controller {
    constructor(){
        this._bindKeyboardEvent();
    }

    _bindKeyboardEvent() {
        document.addEventListener('keyup', (event) => {
            const keyName = event.key;

            // As the user release the Ctrl key, the key is no longer active.
            // So event.ctrlKey is false.
            if (keyName === 'Control') {
                alert('Control key was released');
            }
        }, false);
    }
}