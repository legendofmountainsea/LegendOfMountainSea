const MOUSE_TEXTURE_PATH = '../../assets/mouse.png';

export default class Mouse {
    constructor(){
        this._isOut = false;
        this._sprite = null;
    }

    init(){
        this._sprite = new PIXI.Sprite.fromImage(MOUSE_TEXTURE_PATH);
        return this;
    }

    getSprite(){
        return this._sprite;
    }

    setPosition(position) {
        if (this._sprite) {
            this._sprite.position.x = position.x;
            this._sprite.position.y = position.y;
        }

        return this;
    }

    setOut(isMouseOut){
        this._isOut = isMouseOut;
        return this;
    }

    isOut(){
        return this._isOut;
    }

    tick(delta){

    }

    render(delta){
        this.tick(delta);
    }
}