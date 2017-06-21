export default class UIText {
    constructor(props) {
        this._content = props.content;
        this._style = props.style;
        this._initPosition = props.position? props.position : {x:0,y:0};
        this._onRender = props.onRender? props.onRender : null;
        this._text = null;
    }
}