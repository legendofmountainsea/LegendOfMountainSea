import Actor from './actor';

/**
 * class for ui menu in game
 * @extends Actor
 */
class UIText extends Actor {
    constructor(props) {
        super(props);
        this._style = props.style? props.style : {};
        this._string = props.string ? props.string : '';
    }

    _init(){
        this._sprite = new PIXI.Text(this._string,this._style);
        if(this._onClick){
            this._sprite.interactive = true;
            this._sprite.mousedown = (e) => {
                this._onClick(e);
            };
            this._sprite.mouseover = (e) => {
                this._sprite.style = { ...this._style,
                    stroke: 'white',
                    strokeThickness: 5,
                 };
            };
            this._sprite.mouseout = (e) => {
                this._sprite.style = this._style;
            };
            this._sprite.cursor = null;
        }
        this.setPosition(this._initPosition);
    }
	
	getRenderObject() {

        if(!this._sprite){
            this._init();
        }
        return this._sprite;
    }
	
	dispose(option){
        super.dispose(option);
        this._style = null;
        this._string = null;
    }
    
}

export default UIText;