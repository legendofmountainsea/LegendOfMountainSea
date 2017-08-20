
export default class Actor {
    constructor(props) {
        this._noAsset = props.noAsset ? props.noAsset : false;
        this._initPosition = props.position ? props.position : { x: 0, y: 0 };
        this._onRender = props.onRender ? props.onRender :  ()=>{};
        this._sprite = null;
        this._assetData = props.assetData;
    }

    isNoAsset(){
        return this._noAsset;
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

    render(delta) {
        this.tick(delta);
        this.onRender(delta);
    }

    onRender(delta) {
        if (this._sprite) {
            this._onRender(this._sprite, delta);
        }
    }

    tick(delta){
        //override in subClass
    }
}