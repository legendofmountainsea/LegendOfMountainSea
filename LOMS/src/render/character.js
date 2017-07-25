import Actor from './actor';

export default class Character extends Actor {
    constructor(props) {
        super(props);
        this._frames = {};
        this._destination = null;
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

        this.setPosition(this._initPosition);
        this._sprite.play();
    }

    moveTo(position) {
        this._destination = position;
    }

    tick(delta) {
        this.updatePosition();
    }

    updatePosition(){
        if (!this._sprite || !this._destination) {
            return;
        }

        const { x, y } = this._sprite.position;
        let dx = x,
            dy = y;

        if (x !== this._destination.x) {
            dx = x + Math.sign(this._destination.x - x);
        }

        if (y !== this._destination.y) {
            dy = y + Math.sign(this._destination.y - y);
        }

        this.setPosition({ x: dx, y: dy });
    }

    playStand() {
        this.setAnimation('STAND', 0.025);
    }

    playWalk() {
        this.setAnimation('WALK', 0.08);
    }

    playAttack() {
        this.setAnimation('ATTACK', 0.12, false, () => {
            this.playStand();
        });
    }

    setAnimation(name, speed, loop = true, onCompletefunction) {

        this._sprite.textures = this._frames[this._assetData.DATA[name].NAME];

        this._sprite.animationSpeed = speed;

        this._sprite.onComplete = onCompletefunction;

        this._sprite.loop = loop;

        this._sprite.play();
    }
};