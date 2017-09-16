import Actor from './actor';

export default class Character extends Actor {
    constructor(props) {
        super(props);
        this._frames = {};
        this._destination = null;
        this._animationStatus = 'STAND';
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
        this._sprite.animationSpeed = this._assetData.DATA['STAND'].SPEED;

        this.setPosition(this._initPosition);
        this._sprite.play();
    }

    moveTo(position) {
        this._destination = position;
        this.playWalk();
    }

    tick(delta) {
        this.updatePosition(delta);
    }

    updatePosition(delta) {
        if (!this._sprite || !this._destination) {
            return;
        }

        const { x, y } = this._sprite.position;

        if (x === this._destination.x && y === this._destination.y) {
            if (this._animationStatus === 'WALK') {
                this.playStand();
            }
            return;
        }

        let dx = x,
            dy = y;

        if (x !== this._destination.x) {
            dx = x + Math.sign(this._destination.x - x) * delta;
        }

        if (y !== this._destination.y) {
            dy = y + Math.sign(this._destination.y - y) * delta;
        }

        this.setPosition({ x: dx, y: dy });
    }

    playStand() {
        this.setAnimation('STAND');
        this.setAnimationStatus('STAND');
    }

    playWalk() {
        this.setAnimation('WALK');
        this.setAnimationStatus('WALK');
    }

    playAttack() {
        this.setAnimation('ATTACK', false, () => {    
            this.setAnimation(this.getAnimationStatus());
        });
    }

    playBattle(){
        this.setAnimation('BATTLE');
        this.setAnimationStatus('BATTLE');
    }

    setAnimationStatus(status) {
        this._animationStatus = status;
        return this;
    }
 
    getAnimationStatus() {
        return this._animationStatus;
    }

    setAnimation(name, loop = true, onCompletefunction) {

        this._sprite.textures = this._frames[this._assetData.DATA[name].NAME];

        this._sprite.animationSpeed = this._assetData.DATA[name].SPEED;

        this._sprite.onComplete = onCompletefunction;

        this._sprite.loop = loop;

        this._sprite.play();
    }
};