
export default class Actor {
    constructor(props) {
        this._isSpriteSheet = props.isSpriteSheet ? props.isSpriteSheet : false;
        this._initPosition = props.position ? props.position : { x: 0, y: 0 };
        this._onRender = props.onRender ? props.onRender : null;
        this._sprite = null;
        this._assetData = props.assetData;
    }

    setID(ID) {
        this._ID = ID;
        return this;
    }

    getID() {
        return this._ID;
    }
    
    getSprite() {
        return this._sprite;
    }

    setPosition(position) {
        if (this._sprite) {
            this._sprite.position.x = position.x;
            this._sprite.position.y = position.y;
        }

        return this;
    }

    bindRender(onRender) {
        this._onRender = onRender;
        return this;
    }

    onRender(delta) {
        if (this._onRender && this._sprite) {
            this._onRender(this._sprite, delta);
        }
    }

    render(delta) {
        this.onRender(delta);
    }
}