
export default class Actor {
    constructor(props) {
        this._name = props.name;
        this._path = props.path;
        this._initPosition = props.position? props.position : {x:0,y:0};
        this._onRender = props.onRender? props.onRender : null;
        this._sprite = null;
    }

    initResouce(resouce){
        this._sprite = new PIXI.Sprite(resouce.texture);

        this._sprite.anchor.set(0.5,0.5);

        this._sprite.position.x = this._initPosition.x;
        this._sprite.position.y = this._initPosition.y;
    }

    setID(ID){
        this._ID = ID;
        return this;
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

    bindRender(onRender){
        this._onRender = onRender;
        return this;
    }

    onRender(delta){
        if(this._onRender){
            this._onRender(this._sprite, delta);
        }
    }

    render(delta) {
        this.onRender(delta);
    }
}