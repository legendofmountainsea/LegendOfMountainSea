//@flow

import Actor from './actor';
import Coordinates from '../core/coordinates';
import Hexagon from './hexagon';
import Navigator from '../core/navigator';
import {CharacterCrashingError} from '../util/errorUtil';


type CharacterPropsType = {
    assetData: Object | null,
    position: Coordinates,
    onRender: number => void | null,
    onClick: void => void | null,
};

/**
 * class for render player's character
 * @extends Actor
 */
class Character extends Actor {

    _frames: Object;
    _navigator: Navigator | null;
    _currentHexagon: Hexagon | null;
    _destinationHexagon: Hexagon | null;
    _destination: Coordinates | null;
    _animationStatus: string;

	/**
	 * create a character
	 * @param props
	 */
	constructor(props: CharacterPropsType) {
		super(props);
		this._frames = {};
		this._navigator = null;
		this._currentHexagon = null;
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

		if(this._assetData) {

			const assetDataInfo = this._assetData.DATA;

            for (let asset in assetDataInfo) {
                this._frames[assetDataInfo[asset].NAME] = [];

                let resource = resources[assetDataInfo[asset].NAME];
                for (let texture in resource.textures) {
                    this._frames[assetDataInfo[asset].NAME].push(resource.textures[texture]);
                }
            }

            const animatedSprite = new PIXI.extras.AnimatedSprite(this._frames[assetDataInfo[this._animationStatus].NAME]);

            this.setElement(animatedSprite);

            this.initSprite();
        }

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
		if(this._assetData){
            this._sprite.animationSpeed = this._assetData.DATA[this._animationStatus].SPEED;
		}
		
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
        const navigator = this._navigator;

		if(!navigator){
			return;
		}

        navigator.getNavigation({current:this._currentHexagon, destination:hexagon});
	}
	
	getDestination(): Coordinates | null {
		return this._destination;
	}

	getDestinationHexagon(): Hexagon | null{
		return this._destinationHexagon;
	}
	
	getDirection() {
		return this._sprite.scale.x;
	}
	
	tick(delta: number) {
		this.updatePosition(delta);
	}

	updateDestination(){
        const destinationHexagon = this.getDestinationHexagon();

		if(!this.getDestination() || !destinationHexagon){
			return;
		}

		this._destination = destinationHexagon.toGlobalPosition();
	}
	
	updatePosition(delta: number) {
		if (!this._sprite) {
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

        const destination = this.getDestination();

        if(!destination){
            throw CharacterCrashingError(this);
        }

		const {x} = this._sprite.position,
			distanceX = destination.x - x;

		if(0 === distanceX){
			return x;
		}

		if (this._isMovingDirectionNeedToChange()) {
			this._sprite.scale.x = -this._sprite.scale.x;
		}

		return this._getAxisDelta(x,delta,distanceX);
	}
	
	_isMovingDirectionNeedToChange(): boolean {
        const destination = this.getDestination();

        if(!destination){
            throw CharacterCrashingError(this);
        }

		const {x} = this._sprite.position;

		const distanceX = destination.x - x;
		
		const direction = Math.sign(distanceX) < 0 ? this.DIRECTION_LEFT : this.DIRECTION_RIGHT;
		
		return (this._sprite.scale.x !== direction);
	}
	
	
	movingOnAxisYToDestination(delta: number): number {
        const destination = this.getDestination();

        if(!destination){
            throw CharacterCrashingError(this);
        }

		const {y} = this._sprite.position,
			distanceY = destination.y - y;

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
		const destination = this.getDestination();

        if(!destination){
            throw CharacterCrashingError(this);
        }

		const {x, y} = this._sprite.position;
		
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
		
		if (!this._sprite || this._noAsset || !this._assetData) {
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
		this._frames = {};
		this._destination = null;
	}
}

export default Character;