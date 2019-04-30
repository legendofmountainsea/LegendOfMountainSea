//@flow
import * as PIXI from 'pixi.js';
import S_worldTerrainAsset from '../static/terrain/worldTerrainAsset';

import Coordinates from '../core/coordinates';
import TerrainNavigator from '../core/navigation/terrainNavigator';

import ElementCore from './elementCore';
import Hexagon from './hexagon';
import LayerAgent from './layerAgent';
import TerrainChain,{COS_30_DEGREES} from '../chain/terrainChain';
import Window from '../module/window';

type TerrainPropsType = {
	assetData?: Object,
	coordinates: Coordinates,
};

/**
 * class for rendering terrain on the map
 * @extends ElementCore
 */
class Terrain extends ElementCore {

	_container: any;
	_resources: any;
	_layerAgent: LayerAgent;
	_navigator: TerrainNavigator | null;
	_isPointsOnTerrainChanged: boolean;
	_assetData: ?Object;
	_coordinates: Coordinates;
	_hexagons: Array<Hexagon>;
	_renderPointOnTerrain: Array<Coordinates>;

	/**
	 * create terrain
	 * @param props {object}
	 * @todo https://github.com/SkyHarp/LegendOfMountainSea/issues/40
	 */
	constructor(props: TerrainPropsType) {
		super(props);
		this._container = null;
		this._resources = null;
		this._navigator = null;
		this._isPointsOnTerrainChanged = false;
		this._assetData = props.assetData;
		this._coordinates = props.coordinates;
		this._hexagons = [];
		this._renderPointOnTerrain = [];
	}

	PRE_RENDER_SCALE = 1.5;
	RENDER_OUTSIDE_OF_EDGE = 3;

	/**
	 * init terrain asset resources for render
	 * @param resources
	 * @returns {Terrain}
	 * @override
	 */
	initResources(resources: Object): Terrain {
		this._resources = resources;

		const terrainResource = this._resources[S_worldTerrainAsset.HEXAGON.DATA.NAME];
		const {height, width} = terrainResource.texture;
		TerrainChain.setHexagonSize({height, width});

		this._initLayerAgent();

		this.setTransform(new Coordinates(0, 0));

		return this;
	}

	getNavigator() {
		if (!this._navigator) {
			this._initNavigator();
		}

		return this._navigator;
	}

	_initNavigator(): Terrain {
		this._navigator = new TerrainNavigator({terrain: this});
		return this;
	}

	/**
	 * create terrain layer to manage render elements
	 * @returns {Terrain}
	 * @private
	 */
	_initLayerAgent(): Terrain {
		this._container = new PIXI.Container();
		this._layerAgent = new LayerAgent({container: this._container, stage: this._stage});

		return this;
	}

	/**
	 * make terrain transform by vector
	 * @param transform {Coordinates}
	 * @returns {Terrain}
	 * @override
	 */
	setTransform(transform: Coordinates): Terrain {

		this._coordinates.x += transform.x;
		this._coordinates.y += transform.y;

		this._container.x = this._coordinates.x;
		this._container.y = this._coordinates.y;

		/**
		 * transform coordinates are the opposites direction of the render direction
		 * so here we need: -x & -y instead for render new area for terrain
		 */
		this.renderHexagonRegion(new Coordinates(-this._coordinates.x, -this._coordinates.y));

		return this;
	}

	/**
	 * flush current terrain in memory, save render coordinates in TerrainChain for re-render
	 * @returns {Terrain}
	 */
	flush(): Terrain {
		TerrainChain.updateRenderStartingCoordinates(new Coordinates(this._coordinates.x, this._coordinates.y));
		this._coordinates = new Coordinates(0, 0);
		this._isPointsOnTerrainChanged = true;
		return this;
	}

	/**
	 * add hexagon element in terrain render array
	 * @param hexagon {Hexagon}
	 * @returns {Terrain}
	 */
	addHexagon(hexagon: Hexagon): Terrain {
		this._hexagons.push(hexagon);
		this._layerAgent.addElement(hexagon);
		return this;
	}

	/**
	 * remove hexagon element from terrain render array
	 * @param hexagon
	 */
	removeHexagon(hexagon: Hexagon) {
		for (let index = 0; index < this._hexagons.length; ++index) {
			if (this._hexagons[index].getID() === hexagon.getID()) {
				this._hexagons.splice(index, 1);
				break;
			}
		}

		this._layerAgent.removeElement(hexagon);
	}

	/**
	 * get render element object
	 * @returns {PIXI.Container}
	 * @override
	 */
	getRenderObject() {
		return this._container;
	}

	/**
	 * get render position on render canvas
	 * @returns {Coordinates}
	 * @override
	 */
	getPosition(): Coordinates {
		return new Coordinates(this._container.x, this._container.y);
	}

	/**
	 * tick function for renderer
	 * @param delta {number}
	 * @override
	 */
	tick(delta: number) {
		if (!this._isPointsOnTerrainChanged) {
			return;
		}
		this.hexagonRenderRecycle();
	}

	/**
	 * render callback interface function
	 * @param delta {number}
	 * @param delta
	 * @override
	 */
	onRender(delta: number) {

	}

	/**
	 * loop the hexagons array, check if there is some hexagon not on the map.
	 * if hexagon is not show on the map, remove from memory
	 * @returns {Terrain}
	 */
	hexagonRenderRecycle(): Terrain {
		for (let index = 0; index < this._hexagons.length; ++index) {
			const hexagon = this._hexagons[index];
			let isRecyclingHexagon = true;
			for (const point of this._renderPointOnTerrain) {
				const position = hexagon.getPositionOnTerrain();
				if (position.x === point.x && position.y === point.y) {
					isRecyclingHexagon = false;
					break;
				}
			}

			if (isRecyclingHexagon) {
				this._layerAgent.removeElement(hexagon, false);
				this._hexagons.splice(index, 1);
				index--;
			}
		}
		return this;
	}

	/**
	 * check if hexagon is already rendered on the terrain
	 * @param renderPoint {Coordinates} render position
	 * @returns {boolean}
	 * @private
	 */
	_isHexagonAlreadyRendered(renderPoint: Coordinates): boolean {
		return !!this._hexagons.find((hexagon) => {
			const position = hexagon.getPositionOnTerrain();
			return position.x === renderPoint.x && position.y === renderPoint.y;
		});
	}

	/**
	 * create new hexagon to render on the point
	 * @param renderPoint {Coordinates} render position
	 * @private
	 */
	_createHexagonOnRegion(renderPoint: Coordinates): void {
		const {height} = TerrainChain.getHexagonSize();

		const renderStartingCoordinates = TerrainChain.getRenderStartingCoordinates();

		const renderStartingPointX = parseInt(renderStartingCoordinates.x / (height * COS_30_DEGREES)),
			renderStartingPointY = parseInt(renderStartingCoordinates.y / height);

		const gridCoordinates = new Coordinates(renderStartingPointX + renderPoint.x, renderStartingPointY + renderPoint.y);

		const hexagon = new Hexagon({
			gridCoordinates: gridCoordinates,
			terrain: this,
			position: renderPoint,
		}).initResources(this._resources);

		this._isPointsOnTerrainChanged = true;

		this.addHexagon(hexagon);
	}

	/**
	 * render hexagon array by Coordinates
	 * @param topLeft {Coordinates}
	 * @returns {Terrain}
	 */
	renderHexagonRegion(topLeft: Coordinates): Terrain {
		const {height, width} = TerrainChain.getHexagonSize();
		const winDimension = Window.getDimension();

		const topLeftX = parseInt(topLeft.x / (height * COS_30_DEGREES)),
			topLeftY = parseInt(topLeft.y / height);

		const numberOfHexagonOnX = parseInt((winDimension.width / width) * this.PRE_RENDER_SCALE),
			numberOfHexagonOnY = parseInt((winDimension.height / height) * this.PRE_RENDER_SCALE);

		this._renderPointOnTerrain = [];

		for (let index = topLeftX - this.RENDER_OUTSIDE_OF_EDGE; index < (topLeftX + numberOfHexagonOnX); ++index) {
			for (let columnIndex = topLeftY - this.RENDER_OUTSIDE_OF_EDGE; columnIndex < (topLeftY + numberOfHexagonOnY); ++columnIndex) {

				const renderPoint = new Coordinates(index, columnIndex);

				this._renderPointOnTerrain.push(renderPoint);

				if (this._isHexagonAlreadyRendered(renderPoint)) {
					continue;
				}

				this._createHexagonOnRegion(renderPoint);
			}
		}

		return this;
	}

	/**
	 * render function
	 * @param delta {number}
	 * @override
	 */
	render(delta: number) {
		this.tick(delta);
		this.onRender(delta);
	}

	/**
	 * dispose element on the map or in memory
	 * @param option {boolean}
	 * @override
	 */
	dispose(option: boolean = false) {
		this._container.destroy({children: true, texture: true, baseTexture: true});
		this._container = null;
	}
}

export default Terrain;