export default class Actor {
    constructor(props) {
        this._ID = props.ID;
        this._resouce = props.resouce;

        this._init();
    }

    _init() {
        this._sprite = new PIXI.Sprite(this._resouce.texture);

        this._sprite.anchor.set(0.5,0.5);

        this._sprite.position.x = 400;
        this._sprite.position.y = 300;
    }

    getID(){
        return this._ID;
    }

    getSprite(){
        return this._sprite;
    }

    setPosition(position) {
        this._sprite.position.x = position.x;
        this._sprite.position.y = position.y;

        return this;
    }

    render(delta) {
        this._sprite.rotation += (0.01 * delta);
    }
}