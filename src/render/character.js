//@flow

import Actor from './actor';
import Coordinates from '../core/coordinates';
import { CharacterCrashingError } from '../util/errorUtil';
import TerrainChain from '../chain/terrainChain';
import TerrainGrid from '../core/navigation/terrainGrid';
import type Grid from '../core/navigation/grid';
import type Navigator from '../core/navigation/navigator';
import type { AnimationAssetType } from '../static/type/assetDataType';

type CharacterPropsType = {
	assetData?: AnimationAssetType,
	position: Coordinates,
	onRender?: (any, number) => void,
	onClick?: (void) => void,
};

/**
 * class for render player's character
 * @extends Actor
 */
class Character extends Actor {
	_frames: Object;
	_navigator: Navigator | null;
	_currentGrid: Grid;
	_destination: Coordinates | null;
	_animationStatus: string;
	_navigation: Array<Grid>;

	/**
	 * create a character
	 * @param props
	 */
	constructor(props: CharacterPropsType) {
		super(props);
		this._frames = {};
		this._currentGrid = new TerrainGrid({ point: props.position });
		this._destination = null;
		this._navigator = null;
		this._navigation = [];
		this._animationStatus = 'STAND';
	}

	/**
	 * init asset resource for render
	 * @param resources
	 * @returns {Character}
	 * @override
	 */
	initResources(resources: Object) {
		if (this._assetData) {
			const assetData: AnimationAssetType = this._assetData;

			const assetDataInfo = assetData.DATA;

			for (let asset in assetDataInfo) {
				this._frames[assetDataInfo[asset].NAME] = [];

				const resource = resources[assetDataInfo[asset].NAME];
				for (const texture in resource.textures) {
					this._frames[assetDataInfo[asset].NAME].push(
						resource.textures[texture],
					);
				}
			}

			const animatedSprite = new PIXI.extras.AnimatedSprite(
				this._frames[assetDataInfo[this._animationStatus].NAME],
			);

			this.setElement(animatedSprite);

			this.initSprite();
		}

		return this;
	}

	setNavigator(navigator: Navigator) {
		this._navigator = navigator;
		return this;
	}

	setElement(sprite: Object) {
		this._sprite = sprite;
	}

	initSprite() {
		this._sprite.anchor.set(0.5, 0.5);
		const assetData: AnimationAssetType = this._assetData;

		if (assetData) {
			this._sprite.animationSpeed =
				assetData.DATA[this._animationStatus].SPEED;
		}

		const position: Coordinates | null = this._convertGridPositionToTerrain(
			this._initPosition,
		);

		if (!position) {
			throw new CharacterCrashingError(this);
		}

		this.setPosition(position);
		this._sprite.play();
	}

	moveTo(position: Coordinates) {
		if (this._animationStatus !== 'WALK') {
			this.playWalk();
		}
		this._destination = position;
	}

	navigateTo(grid: Grid) {
		const navigator = this._navigator;

		if (!navigator || !this._currentGrid || this._navigation.length) {
			return;
		}

		if (this._currentGrid.getPoint().isEqual(grid.getPoint())) {
			return;
		}

		//TODO remove this later
		if (
			TerrainChain.getTerrainNavigationInfo(grid.getPoint()).height > 150
		) {
			return;
		}

		this._navigation = navigator.getNavigation({
			current: this._currentGrid,
			destination: grid,
		});

		this._setDestinationByNavigation();
	}

	getDestination(): Coordinates | null {
		return this._destination;
	}

	getDirection() {
		return this._sprite.scale.x;
	}

	tick(delta: number) {
		this.updatePosition(delta);
	}

	updateDestination() {
		if (!this.getDestination()) {
			return;
		}

		this._setDestinationByNavigation();
	}

	_setDestinationByNavigation(): void {
		if (!this._navigation.length) {
			return;
		}

		const coordinates = this._navigation[0].getPoint();

		const position: Coordinates | null = this._convertGridPositionToTerrain(
			coordinates,
		);

		const destination: Coordinates | null = this.getDestination();

		if (
			position &&
			!(
				destination &&
				destination.x === position.x &&
				destination.y === position.y
			)
		) {
			this.moveTo(position);
		}
	}

	_convertGridPositionToTerrain(
		coordinates: Coordinates,
	): Coordinates | null {
		if (!this._stage) {
			return null;
		}

		const terrain = this._stage.getTerrain();

		const container = terrain._container;

		let worldTransformX = container.worldTransform.tx,
			worldTransformY = container.worldTransform.ty;

		const adjustedCoordinates = TerrainChain.adjustHexagonRenderPosition(
			coordinates,
		);

		return new Coordinates(
			adjustedCoordinates.x + worldTransformX,
			adjustedCoordinates.y + worldTransformY,
		);
	}

	updatePosition(delta: number) {
		if (!this._sprite || !this.getDestination()) {
			return;
		}

		this.updateDestination();

		if (this._isArrivedAtDestination()) {
			if (this._destination) {
				this.setPosition(
					new Coordinates(this._destination.x, this._destination.y),
				);
			}
			this.updateNavigation();
			return;
		}

		const deltaX = this.movingOnAxisXToDestination(delta),
			deltaY = this.movingOnAxisYToDestination(delta);

		this.setPosition(new Coordinates(deltaX, deltaY));
	}

	updateNavigation(): void {
		this._currentGrid = this._navigation.shift();

		if (!this._navigation.length) {
			if (this._animationStatus === 'WALK') {
				this.playStand();
			}
			this._destination = null;
		} else {
			this.updateDestination();
		}
	}

	movingOnAxisXToDestination(delta: number): number {
		const destination = this.getDestination();

		if (!destination) {
			throw new CharacterCrashingError(this);
		}

		const { x } = this._sprite.position,
			distanceX = destination.x - x;

		if (0 === distanceX) {
			return x;
		}

		if (this._isMovingDirectionNeedToChange()) {
			this._sprite.scale.x = -this._sprite.scale.x;
		}

		return this._getAxisDelta(x, delta, distanceX);
	}

	_isMovingDirectionNeedToChange(): boolean {
		const destination = this.getDestination();

		if (!destination) {
			throw new CharacterCrashingError(this);
		}

		const { x } = this._sprite.position;

		const distanceX = destination.x - x;

		const direction =
			Math.sign(distanceX) < 0
				? this.DIRECTION_LEFT
				: this.DIRECTION_RIGHT;

		return this._sprite.scale.x !== direction;
	}

	movingOnAxisYToDestination(delta: number): number {
		const destination = this.getDestination();

		if (!destination) {
			throw new CharacterCrashingError(this);
		}

		const { y } = this._sprite.position,
			distanceY = destination.y - y;

		if (0 === distanceY) {
			return y;
		}

		return this._getAxisDelta(y, delta, distanceY);
	}

	_getAxisDelta(axisOrigin: number, delta: number, distance: number): number {
		let axisDelta = axisOrigin,
			singOfDistance = Math.sign(distance);

		if (Math.abs(singOfDistance * delta) > Math.abs(distance)) {
			axisDelta = axisOrigin + distance;
		} else {
			axisDelta = axisOrigin + singOfDistance * delta;
		}

		return axisDelta;
	}

	_isArrivedAtDestination() {
		const destination = this.getDestination();

		if (!destination) {
			throw new CharacterCrashingError(this);
		}

		const { x, y } = this._sprite.position;

		const isAlmostAtAxisX = Math.abs(x - destination.x) < 1;
		const isAlmostAtAxisY = Math.abs(y - destination.y) < 1;

		return isAlmostAtAxisX && isAlmostAtAxisY;
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

	setAnimation(
		name: string,
		loop: boolean = true,
		onComplete: (void) => void = () => {},
	) {
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
