import Actor from './actor';

export default class Character extends Actor {
    constructor(props){
        super(props);
        this._name = props.name;
        this._path = props.path;
        this._assetData = props.assetData;
        this._frames = [];
    }

    initResources(resources){

        let resource = resources[this._name];
        
        for(let texture in resource.textures){
            this._frames.push(resource.textures[texture]);
        }
        
        this._sprite = new PIXI.extras.AnimatedSprite(this._frames);
        this._sprite.anchor.set(0.5, 0.5);
        this._sprite.animationSpeed = 0.025;

        this._sprite.position.x = this._initPosition.x;
        this._sprite.position.y = this._initPosition.y;
        this._sprite.play();
    }
};