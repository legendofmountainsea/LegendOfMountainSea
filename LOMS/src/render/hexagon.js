import Actor from './actor';

const COS_60_DEGREES = Math.cos(Math.PI / 6);
export default class Hexagon extends Actor {
    constructor(props) {
        super(props);
        this._height = 0;
        this._width = 0;
    }

    getName() {
        return this._assetData.DATA.NAME;
    }

    initResources(resources) {
        let resource = resources[this.getName()];

        this._sprite = new PIXI.Sprite(resource.texture);
        this._sprite.anchor.set(0.5, 0.5);

        return this;
    }

    setDimensions(dimensions){
        const {height, width} = dimensions;
        this._height = height;
        this._width = width;
        return this;
    }

    onRender(delta){
        if (this._sprite) {
            this._onRender(this._sprite, delta);
        }
        return this;
    }

    setPosition(position) {
        if (this._sprite) {
            this._sprite.position.x = (this._width / 2) + position.x * (this._height * COS_60_DEGREES );
            this._sprite.position.y = position.y * this._height + (this._height / 2) * (1 + position.x % 2);
        }

        return this;
    }

    tick(delta){
        //override in subClass
    }
}