import Actor from './actor';

export default class Character extends Actor {
    constructor(props) {
        super(props);
        this._assetData = props.assetData;
        this._frames = {};
    }

    initResources(resources) {

        for (let asset in this._assetData.DATA) {
                this._frames[this._assetData.DATA[asset].NAME] = [];

                let resource = resources[this._assetData.DATA[asset].NAME];
                for (let texture in resource.textures) {
                    this._frames[this._assetData.DATA[asset].NAME].push(resource.textures[texture]);
                }
        }

        this._sprite = new PIXI.extras.AnimatedSprite(this._frames[this._assetData.DATA['STAND'].NAME]);
        this._sprite.anchor.set(0.5, 0.5);
        this._sprite.animationSpeed = 0.025;

        this._sprite.position.x = this._initPosition.x;
        this._sprite.position.y = this._initPosition.y;
        this._sprite.play();
    }

    setAnimation(name){

        this._sprite.textures = this._frames[this._assetData.DATA[name].NAME];

        this._sprite.play();
    }
};