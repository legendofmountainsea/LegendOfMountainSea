//@flow

import Actor from './actor';
import Coordinates from '../core/coordinates';
import Hexagon from './hexagon';
import type ActorPropsType from './actor';
import Navigator from '../core/navigator';


type CharacterPropsType = {
	...ActorPropsType,
}

/**
 * class for render player's character
 * @extends Actor
 */
class Character extends Actor {
	/**
	 * create a character
	 * @param props
	 */
	constructor(props: CharacterPropsType) {
		super(props);
		this._frames = {};
		this._navigator = null;
		this._destinationHexagon = null;
		this._destination = null;
		this._navigator = null;
		this._animationStatus = 'STAND';
	}
	
	/**
	 * init asset resource for render
	 * @param resources
	 * @returns {Character}
	 * @override
	 */
	initResources(resources: Object) {
		
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
		
		return this;
	}

	setNavigator(navigator: Navigator){
		this._navigator = navigator;
		return this;
	}
	
	setElement(sprite: Object) {
		this._sprite = sprite;
	}
	
	initSprite() {
		this._sprite.anchor.set(0.5, 0.5);
		this._sprite.animationSpeed = this._assetData.DATA[this._animationStatus].SPEED;
		
		this.setPosition(this._initPosition);
		this._sprite.play();
	}
	
	moveTo(position: Coordinates) {
		this._destination = position;
		this.playWalk();
	}

	moveToHexagon(hexagon: Hexagon){
		this._destinationHexagon = hexagon;
		this.moveTo(hexagon.toGlobalPosition());
	}

	navigateTo(hexagon: Hexagon){

	}
	
	getDestination(): Coordinates {
		return this._destination;
	}

	getDestinationHexagon(): Hexagon{
		return this._destinationHexagon;
	}
	
	getDirection() {
		return this._sprite.scale.x;
	}
	
	tick(delta: number) {
		this.updatePosition(delta);
	}

	updateDestination(){
		if(!this.getDestination() || !this.getDestinationHexagon()){
			return;
		}

		this._destination = this.getDestinationHexagon().toGlobalPosition();
	}
	
	updatePosition(delta: number) {
		if (!this._sprite || !this.getDestination()) {
			return;
		}

		this.updateDestination();
		
		if (this._isArrivedAtDestination()) {
			if (this._animationStatus === 'WALK') {
				this.playStand();
			}
			this._destination = null;
			return;
		}
		
		const deltaX = this.movingOnAxisXToDestination(delta),
			deltaY = this.movingOnAxisYToDestination(delta);


		this.setPosition(new Coordinates(deltaX,deltaY));
	}
	
	movingOnAxisXToDestination(delta: number): number {
		const {x} = this._sprite.position,
			distanceX = this.getDestination().x - x;

		if(0 === distanceX){
			return x;
		}

		if (this._isMovingDirectionNeedToChange()) {
			this._sprite.scale.x = -this._sprite.scale.x;
		}

		return this._getAxisDelta(x,delta,distanceX);
	}
	
	_isMovingDirectionNeedToChange(): boolean {
		const {x} = this._sprite.position,
			destination = this.getDestination();
		const distanceX = destination.x - x;
		
		const direction = Math.sign(distanceX) < 0 ? this.DIRECTION_LEFT : this.DIRECTION_RIGHT;
		
		return (this._sprite.scale.x !== direction);
	}
	
	
	movingOnAxisYToDestination(delta: number): number {
		const {y} = this._sprite.position,
			distanceY = this.getDestination().y - y;

		if(0 === distanceY){
			return y;
		}

		return this._getAxisDelta(y,delta,distanceY);
	}

	_getAxisDelta(axisOrigin: number, delta: number, distance: number): number{
		let axisDelta = axisOrigin,
			singOfDistance = Math.sign(distance);

		if(Math.abs(singOfDistance * delta) > Math.abs(distance)){
			axisDelta = axisOrigin + distance;
		}
		else {
			axisDelta = axisOrigin + singOfDistance * delta;
		}

		return axisDelta;
	}
	
	_isArrivedAtDestination() {
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
	
	setAnimationStatus(status: string) {
		this._animationStatus = status;
		return this;
	}
	
	getAnimationStatus(): string {
		return this._animationStatus;
	}
	
	setAnimation(name: string, loop: boolean = true, onComplete: void => void = () => {} ) {
		
		if (!this._sprite || this._noAsset) {
			return;
		}
		
		this._sprite.textures = this._frames[this._assetData.DATA[name].NAME];
		
		this._sprite.animationSpeed = this._assetData.DATA[name].SPEED;
		
		this._sprite.onComplete = onComplete;
		
		this._sprite.loop = loop;
		
		this._sprite.play();
	}
	
	dispose(option: boolean = false) {
		super.dispose(option);
		this._frames = null;
		this._destination = null;
	}
}

export default Character;