import Actor from './actor';

export default class Pattern extends Actor {
    constructor(props){
        super(props);
        this._name = props.name;
        this._path = props.path;
    }

     initResouces(resouces) {

        let resouce = resouces[this.getName()];

        this._sprite = new PIXI.Sprite(resouce.texture);

        this._sprite.anchor.set(0.5, 0.5);

        this._sprite.position.x = this._initPosition.x;
        this._sprite.position.y = this._initPosition.y;
     }
};