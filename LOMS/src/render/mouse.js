const MOUSE_TEXTURE_PATH = '../../assets/mouse.png';
const MOUSE_UP_TEXTURE_PATH = '../../assets/mouseUp.png';

export default class Mouse {
    constructor(){
        this._isOut = false;
        this._sprite = null;
    }

    MOUSE_TEXTURE = new PIXI.Texture.fromImage(MOUSE_TEXTURE_PATH);
    MOUSE_UP_TEXTURE = new PIXI.Texture.fromImage(MOUSE_UP_TEXTURE_PATH);

    init(){
        this._sprite = new PIXI.Sprite(this.MOUSE_TEXTURE);
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
        if(!this._sprite){
            return;
        }

        if(this._sprite.position.y <=0){
            this._sprite.setTexture(this.MOUSE_UP_TEXTURE);
        }else{
            this._sprite.setTexture(this.MOUSE_TEXTURE);
        }
    }

    render(delta){
        this.tick(delta);
    }
}