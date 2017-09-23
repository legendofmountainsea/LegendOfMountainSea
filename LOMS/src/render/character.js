import Actor from './actor';

export default class Character extends Actor {
    constructor(props) {
        super(props);
        this._frames = {};
        this._direction = this.DIRECTION_RIGHT;
        this._destination = null;
        this._animationStatus = 'STAND'+ this._direction;
    }

    DIRECTION_RIGHT = 0;
    DIRECTION_LEFT = 1;

    initResources(resources) {

        for (let asset in this._assetData.DATA) {
            this._frames[this._assetData.DATA[asset].NAME] = [];

            let resource = resources[this._assetData.DATA[asset].NAME];
            for (let texture in resource.textures) {
                this._frames[this._assetData.DATA[asset].NAME].push(resource.textures[texture]);
            }
        }

        this._sprite = new PIXI.extras.AnimatedSprite(this._frames[this._assetData.DATA[this._animationStatus].NAME]);
        this._sprite.anchor.set(0.5, 0.5);
        this._sprite.animationSpeed = this._assetData.DATA[this._animationStatus].SPEED;

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
            if (this._animationStatus === 'WALK' + this._direction) {
                this.playStand();
            }
            return;
        }

        let dx = x,
            dy = y;

        if (x !== this._destination.x) {

            let distanceX = this._destination.x - x;

            const direction = Math.sign(distanceX) < 0? this.DIRECTION_RIGHT : this.DIRECTION_LEFT;

            if(this._direction !== direction){
                this.playWalk(direction);
                this._direction = direction;
            }

            if(  Math.abs(Math.sign(distanceX) * delta) > Math.abs(distanceX)) {
                dx = x + distanceX;
            }
            else{
                dx = x + Math.sign(distanceX) * delta;
            }
        }

        if (y !== this._destination.y) {

            if(  Math.abs(Math.sign(this._destination.y - y) * delta) > Math.abs(this._destination.y - y)) {
                dy = y + (this._destination.y - y);
            }
            else{
                dy = y + Math.sign(this._destination.y - y) * delta;
            }
        }

        this.setPosition({ x: dx, y: dy });
    }

    playStand() {
        this.setAnimation('STAND'+ this._direction);
        this.setAnimationStatus('STAND'+ this._direction);
    }

    playWalk(direction) {
        this.setAnimation('WALK' + direction);
        this.setAnimationStatus('WALK' + direction);
    }

    playAttack() {
        this.setAnimation('ATTACK' + this._direction, false, () => {
            this.setAnimation(this.getAnimationStatus());
        });
    }

    playBattle(){
        this.setAnimation('BATTLE' + this._direction);
        this.setAnimationStatus('BATTLE' + this._direction);
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