import Actor from './actor';
import Style from '../static/textStyle';

export default class UIText extends Actor {
    constructor(props) {
        super(props);
        this._noAsset = true;
        this._style = props.style? props.style : Style.TITLE;
        this._string = props.string ? props.string : '';
        this._onClick = props.onClick ? props.onClick : () => { };
    }

    _init(){
        this._sprite = new PIXI.Text(this._string,this._style);
        this.setPosition(this._initPosition);
    }

    getSprite() {

        if(!this._sprite){
            this._init();
        }
        return this._sprite;
    }

    setPosition(position) {
        if (this._sprite) {
            this._sprite.x = position.x;
            this._sprite.y = position.y;
        }

        return this;
    }
}