
export default class Actor {
    constructor(props) {
        this._name = props.name;
        this._path = props.path;

        this._sprite = null;
    }

    initResouce(resouce){
        this._sprite = new PIXI.Sprite(resouce.texture);

        this._sprite.anchor.set(0.5,0.5);

        this._sprite.position.x = this._initPosition.x;
        this._sprite.position.y = this._initPosition.y;
    }

    _init() {
        this._sprite = new PIXI.Sprite(this._resouce.texture);

        this._sprite.anchor.set(0.5,0.5);

        this._sprite.position.x = 400;
        this._sprite.position.y = 300;
    }

    setID(ID){
        this._ID = ID;
    }

    getID(){
        return this._ID;
    }

    getName(){
        return this._name;
    }

    getPath(){
        return this._path;
    }

    getSprite(){
        return this._sprite;
    }

    setPosition(position) {
        this._sprite.position.x = position.x;
        this._sprite.position.y = position.y;

        return this;
    }

    setInitPosition(position){
        this._initPosition = position;

        return this;
    }

    onRender(delta){
    }

    render(delta) {
        this._sprite.rotation += (0.01 * delta);
    }
}