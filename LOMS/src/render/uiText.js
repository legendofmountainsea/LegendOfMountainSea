export default class UIText {
    constructor(props) {
        this._content = props.content;
        this._style = props.style;
        this._initPosition = props.position? props.position : {x:0,y:0};
        this._onRender = props.onRender? props.onRender : null;
        this._onClick = props.onClick? props.onClick : null;
        this._text = null;
        this._sprite = null;
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
        if (this._onRender && this._sprite) {
            this._onRender(this._sprite, delta);
        }
    }

    tick(delta){
        //override in subClass
    }
}