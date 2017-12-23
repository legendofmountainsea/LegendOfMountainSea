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
		
		const animatedSprite = new PIXI.extras.AnimatedSprite(this._frames[this._assetData.DATA[this._animationStatus].NAME]);
		
		this.setElement(animatedSprite);
		
		this.initSprite();
	}
	
	setElement(sprite) {
		this._sprite = sprite;
	}
	
	initSprite() {
		this._sprite.anchor.set(0.5, 0.5);
		this._sprite.animationSpeed = this._assetData.DATA[this._animationStatus].SPEED;
		
		this.setPosition(this._initPosition);
		this._sprite.play();
	}
	
	moveTo(position) {
		this._destination = position;
		this.playWalk();
	}
	
	getDestination() {
		return this._destination;
	}
	
	getDirection() {
		return this._sprite.scale.x;
	}
	
	tick(delta) {
		this.updatePosition(delta);
	}
	
	updatePosition(delta) {
		if (!this._sprite || !this.getDestination()) {
			return;
		}
		
		if (this.isArrivedAtDestination()) {
			if (this._animationStatus === 'WALK') {
				this.playStand();
			}
			this._destination = null;
			return;
		}
		
		const deltaX = this.movingOnAxisXToDestination(delta),
			deltaY = this.movingOnAxisYToDestination(delta);
		
		this.setPosition({x: deltaX, y: deltaY});
	}
	
	movingOnAxisXToDestination(delta) {
		const {x} = this._sprite.position,
			distanceX = this.getDestination().x - x;
		
		let deltaX = x;
		
		if (0 !== distanceX) {
			
			if (Math.abs(Math.sign(distanceX) * delta) > Math.abs(distanceX)) {
				deltaX = x + distanceX;
			}
			else {
				deltaX = x + Math.sign(distanceX) * delta;
			}
			
			if (this.isMovingDirectionNeedToChange()) {
				this._sprite.scale.x = -this._sprite.scale.x;
			}
		}
		
		return deltaX;
	}
	
	isMovingDirectionNeedToChange() {
		const {x} = this._sprite.position,
			destination = this.getDestination();
		const distanceX = destination.x - x;
		
		const direction = Math.sign(distanceX) < 0 ? this.DIRECTION_LEFT : this.DIRECTION_RIGHT;
		
		return (this._sprite.scale.x !== direction);
	}
	
	
	movingOnAxisYToDestination(delta) {
		const {y} = this._sprite.position,
			distanceY = this.getDestination().y - y;
		
		let deltaY = y;
		
		if (0 !== distanceY) {
			
			if (Math.abs(Math.sign(distanceY) * delta) > Math.abs(distanceY)) {
				deltaY = y + (distanceY);
			}
			else {
				deltaY = y + Math.sign(distanceY) * delta;
			}
		}
		
		return deltaY;
	}
	
	isArrivedAtDestination() {
		const {x, y} = this._sprite.position,
			destination = this.getDestination();
		
		return (x === destination.x && y === destination.y);
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
	
	playBattle() {
		this.setAnimation('BATTLE');
		this.setAnimationStatus('BATTLE');
	}
	
	playNearDeath() {
		this.setAnimation('NEAR_DEATH');
		this.setAnimationStatus('NEAR_DEATH');
	}
	
	playUltimate() {
		this.setAnimation('ULTIMATE', false, () => {
			this.setAnimation(this.getAnimationStatus());
		});
	}
	
	setAnimationStatus(status) {
		this._animationStatus = status;
		return this;
	}
	
	getAnimationStatus() {
		return this._animationStatus;
	}
	
	setAnimation(name, loop = true, onComplete) {
		
		if (!this._sprite || this._noAsset) {
			return;
		}
		
		this._sprite.textures = this._frames[this._assetData.DATA[name].NAME];
		
		this._sprite.animationSpeed = this._assetData.DATA[name].SPEED;
		
		this._sprite.onComplete = onComplete;
		
		this._sprite.loop = loop;
		
		this._sprite.play();
	}
	
	dispose() {
		super.dispose();
		this._frames = null;
		this._destination = null;
	}
}