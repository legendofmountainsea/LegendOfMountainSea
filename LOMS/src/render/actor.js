import 'pixi.js';
export default class Actor {
    constructor(props){
        this._props = props;

        this._init();
    }

    _init(){
        this._sprite = new PIXI.Sprite(this._props.resouce.texture);

            this._sprite.position.x = 400;
            this._sprite.position.y = 300;
    }

    setPosition(position){
        this._sprite.position.x = position.x;
        this._sprite.position.y = position.y;

        return this;
    }

    render(delta){
       
    }
}