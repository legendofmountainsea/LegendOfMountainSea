export default class Pawn {
    constructor() {
        this._active = false;
    }

    setActive(isActive) {
        this._active = isActive;
        return this;
    }

    
};