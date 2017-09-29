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

    getDestination(){
        return this._destination;
    }

    tick(delta) {
        this.updatePosition(delta);
    }

    updatePosition(delta) {
        if (!this._sprite || !this.getDestination()) {
            return;
        }

        const { x, y } = this._sprite.position,
            destination = this.getDestination();

        if (x === destination.x && y === destination.y) {
            if (this._animationStatus === 'WALK') {
                this.playStand();
            }
            return;
        }

        let dx = x,
            dy = y;

        if (x !== destination.x) {

            let distanceX = destination.x - x;

            const direction = Math.sign(distanceX) < 0? this.DIRECTION_LEFT : this.DIRECTION_RIGHT ;

            if(  Math.abs(Math.sign(distanceX) * delta) > Math.abs(distanceX)) {
                dx = x + distanceX;
            }
            else{
                dx = x + Math.sign(distanceX) * delta;
            }

            if(this._sprite.scale.x !== direction){
                this._sprite.scale.x = direction;
            }
        }

        if (y !== destination.y) {

            if(  Math.abs(Math.sign(destination.y - y) * delta) > Math.abs(destination.y - y)) {
                dy = y + (destination.y - y);
            }
            else{
                dy = y + Math.sign(destination.y - y) * delta;
            }
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
        this.setAnimation('ATTACK' , false, () => {
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

        if(!this._sprite){
            return;
        }

        this._sprite.textures = this._frames[this._assetData.DATA[name].NAME];

        this._sprite.animationSpeed = this._assetData.DATA[name].SPEED;

        this._sprite.onComplete = onCompletefunction;

        this._sprite.loop = loop;

        this._sprite.play();
    }
};