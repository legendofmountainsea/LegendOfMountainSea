const MOUSE_DEFAULT_TEXTURE_PATH = '../../assets/mouse.png';
const MOUSE_UP_TEXTURE_PATH = '../../assets/mouseUp.png';
const MOUSE_DOWN_TEXTURE_PATH = '../../assets/mouseDown.png';
const MOUSE_LEFT_TEXTURE_PATH = '../../assets/mouseLeft.png';
const MOUSE_RIGHT_TEXTURE_PATH = '../../assets/mouseRight.png';


export default class Mouse {
    EDGE = 40;

    constructor(_renderer){
        this._isOut = false;
        this._sprite = null;
        this._renderer = _renderer;
    }

    init(){
        this.TEXTURE_DEFAULT = new PIXI.Texture.fromImage(MOUSE_DEFAULT_TEXTURE_PATH);
        this.TEXTURE_UP = new PIXI.Texture.fromImage(MOUSE_UP_TEXTURE_PATH);
        this.TEXTURE_DOWN = new PIXI.Texture.fromImage(MOUSE_DOWN_TEXTURE_PATH);
        this.TEXTURE_LEFT = new PIXI.Texture.fromImage(MOUSE_LEFT_TEXTURE_PATH);
        this.TEXTURE_RIGHT = new PIXI.Texture.fromImage(MOUSE_RIGHT_TEXTURE_PATH);

        this._sprite = new PIXI.Sprite(this.TEXTURE_DEFAULT);
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

        const {width: world_width, height: world_height} = this._renderer.view;
        if(this._sprite.position.y <= this.EDGE){
            this._sprite.texture = this.TEXTURE_UP;
        }else if(this._sprite.position.y >= world_height - this.EDGE){
            this._sprite.texture = this.TEXTURE_DOWN;
        }else if(this._sprite.position.x <= this.EDGE){
            this._sprite.texture = this.TEXTURE_LEFT;
        }else if(this._sprite.position.x >= world_width - this.EDGE){
            this._sprite.texture = this.TEXTURE_RIGHT;
        }else{
            this._sprite.texture = this.TEXTURE_DEFAULT;
        }
    }

    render(delta){
        this.tick(delta);
    }
}
