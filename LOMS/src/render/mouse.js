const MOUSE_TEXTURE_PATH = '../../assets/mouse.png';

export default class Mouse {
    constructor(){
        this._sprite = null;
    }

    init(){
        this._sprite = new PIXI.Sprite.fromImage(MOUSE_TEXTURE_PATH);
        return this;
    }

    getSprite(){
        return this._sprite;
    }

    tick(delta){

    }

    render(delta){
        this.tick(delta);
    }
}