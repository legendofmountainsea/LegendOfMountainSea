//@flow

import Pattern from './pattern';
import Terrain from './terrain';
import Coordinates from '../core/coordinates';
import TerrainGrid from '../core/terrainGrid';
import TerrainChain from "../chain/terrainChain";

type HexagonPropsType = {
	assetData?: Object,
	onRender?: (any,number) => void,
	onClick?: void => void,
	terrain: Terrain,
	position: Coordinates,
	gridCoordinates: Coordinates,
}

/**
 * class for rendering a hexagon grid on terrain
 * @param props {Object}
 * @param props.terrain {Terrain}
 * @extends Pattern
 */
class Hexagon extends Pattern {

	_terrain: Terrain;
	_terrainGrid: TerrainGrid;
	_gridCoordinates: Coordinates;
	_positionOnTerrain: Coordinates;

	constructor(props: HexagonPropsType) {
		super(props);
		this._assetData = TerrainChain.getTerrainAssetData(props.gridCoordinates);
		this._terrain = props.terrain;
		this._gridCoordinates = props.gridCoordinates;
		this._positionOnTerrain = props.position;

		this._initGrid();
	}

	_initGrid() {
		this._terrainGrid = new TerrainGrid({point: this._gridCoordinates});
	}

	getGrid() {
		return this._terrainGrid;
	}

	initResources(resources: Object) {
		super.initResources(resources);

		this._sprite.interactive = true;
		this._sprite.mouseup = (e) => {
			const stage = this._stage;
			if(stage){
				stage.onClickEventTrigger(this);
			}


			// let worldTransformX = this._terrain._container.worldTransform.tx,
			//     worldTransformY = this._terrain._container.worldTransform.ty;
			//
			// console.log(worldTransformX, worldTransformY);
			//
			// worldTransformX = this._sprite.worldTransform.tx;
			// worldTransformY = this._sprite.worldTransform.ty;
			//
			// console.log(worldTransformX, worldTransformY);
			//
			// console.log((this._width / 2) + this._positionOnTerrain.x * (this._height * COS_30_DEGREES ),
			//     this._positionOnTerrain.y * this._height + (this._height / 2) * (1 + Math.abs(this._positionOnTerrain.x) % 2),)
		};

		this.setPosition(TerrainChain.adjustHexagonRenderPosition(this._positionOnTerrain));

		this._initDimensions();

		return this;
	}

	_initDimensions() {
		const {height} = TerrainChain.getHexagonSize();

		if (this._sprite) {
			this._sprite.hitArea = new PIXI.Circle(0, 0, height * 0.5);
		}
		return this;
	}

	onRender(delta: number) {
		if (this._sprite && this._onRender) {
			this._onRender(this._sprite, delta);
		}
		return this;
	}

	/**
	 * set position on terrain with a grid position system
	 * @param position {Coordinates} a grid position coordinates which x & y always is integer
	 * @returns {Hexagon}
	 */
	setPositionOnTerrain(position: Coordinates) {
		this._positionOnTerrain = position;
		this.adjustRenderPosition(position);

		return this;
	}

	/**
	 * found right render position for the center of hexagon
	 * @param position {Coordinates}
	 * @returns {Hexagon}
	 */
	adjustRenderPosition(position: Coordinates) {
		this.setPosition(TerrainChain.adjustHexagonRenderPosition(position));
		return this;
	}

	/**
	 * get hexagon position on terrain grid system
	 * @returns {null|*}
	 */
	getPositionOnTerrain() {
		return this._positionOnTerrain;
	}

	tick(delta: number) {
	}

	dispose(option: boolean = false) {
		super.dispose(option);
	}
}

export default Hexagon;