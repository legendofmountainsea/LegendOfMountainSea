import ElementCore from './elementCore';
import Hexagon, {COS_60_DEGREES} from './hexagon';
import LayerAgent from './layerAgent';
import TerrainChain from '../chain/terrainChain';
import Coordinates from '../core/coordinates';
import Window from '../module/window';

/**
 * class for rendering terrain on the map
 * @extends ElementCore
 */
class Terrain extends ElementCore {
	/**
	 * create terrain
	 * @param props {object}
	 * @todo https://github.com/SkyHarp/LegendOfMountainSea/issues/40
	 */
	constructor(props) {
		props = props || {};
		super(props);
		this._container = null;
		this._resources = null;
		this._isPointsOnTerrainChanged = false;
		this._coordinates = props.coordinates ? props.coordinates : new Coordinates(0, 0);
		this._noAsset = !props.assetData;
		this._assetData = props.assetData;
		this._hexagons = [];
		this._renderPointOnTerrain = [];
	}
	
	PRE_RENDER_SCALE = 1.5;
	RENDER_OUTSIDE_OF_EDGE = 3;
	
	/**
	 * create terrain layer to manage render elements
	 * @returns {Terrain}
	 * @private
	 */
	_initLayerAgent() {
		this._container = new PIXI.Container();
		this._layerAgent = new LayerAgent({container: this._container});
		
		return this;
	}
	
	/**
	 * init terrain asset resources for render
	 * @param resources
	 * @returns {Terrain}
	 * @override
	 */
	initResources(resources) {
		this._resources = resources;
		this._initLayerAgent();
		
		this.setTransform(new Coordinates(0, 0));
		
		return this;
	}
	
	/**
	 * make terrain transform by vector
	 * @param transform {Coordinates}
	 * @returns {Terrain}
	 * @override
	 */
	setTransform(transform) {
		
		this._coordinates.x += transform.x;
		this._coordinates.y += transform.y;
		
		this._container.x = this._coordinates.x;
		this._container.y = this._coordinates.y;
		
		this.renderHexagonRegion(new Coordinates(this._coordinates.x, this._coordinates.y));
		
		return this;
	}
	
	/**
	 * flush current terrain in memory, save render coordinates in TerrainChain for re-render
	 * @returns {Terrain}
	 */
	flush() {
		TerrainChain.updateRenderStartingCoordinates({...this._coordinates});
		this._coordinates = {
			x: 0,
			y: 0,
		};
		this._isPointsOnTerrainChanged = true;
		return this;
	}
	
	/**
	 * add hexagon element in terrain render array
	 * @param hexagon {Hexagon}
	 * @returns {Terrain}
	 */
	addHexagon(hexagon) {
		this._hexagons.push(hexagon);
		this._layerAgent.addElement(hexagon, 0);
		return this;
	}
	
	/**
	 * remove hexagon element from terrain render array
	 * @param hexagon
	 */
	removeHexagon(hexagon) {
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
	getPosition() {
		return new Coordinates(this._container.x, this._container.y);
	}
	
	/**
	 * tick function for renderer
	 * @param delta {number}
	 * @override
	 */
	tick(delta) {
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
	onRender(delta) {
	
	}
	
	/**
	 * loop the hexagons array, check if there is some hexagon not on the map.
	 * if hexagon is not show on the map, remove from memory
	 * @returns {Terrain}
	 */
	hexagonRenderRecycle() {
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
	 * render hexagon array by Coordinates
	 * @param topLeft {Coordinates}
	 * @returns {Terrain}
	 */
	renderHexagonRegion(topLeft) {
		const terrainResource = this._resources[this._assetData.DATA.NAME];
		const renderStartingCoordinates = TerrainChain.getRenderStartingCoordinates();
		const {height, width} = terrainResource.texture;
		const winDimension = Window.getDimension();
		
		const topLeftX = -parseInt(topLeft.x / (height * COS_60_DEGREES)),
			topLeftY = -parseInt(topLeft.y / height);
		
		const numberOfHexagonOnX = parseInt((winDimension.width / width) * this.PRE_RENDER_SCALE),
			numberOfHexagonOnY = parseInt((winDimension.height / height) * this.PRE_RENDER_SCALE),
			renderStartingPointX = -parseInt(renderStartingCoordinates.x / (height * COS_60_DEGREES)),
			renderStartingPointY = -parseInt(renderStartingCoordinates.y / height);
		
		this._renderPointOnTerrain = [];
		
		for (let index = topLeftX - this.RENDER_OUTSIDE_OF_EDGE; index < (topLeftX + numberOfHexagonOnX); ++index) {
			for (let columnIndex = topLeftY - this.RENDER_OUTSIDE_OF_EDGE; columnIndex < (topLeftY + numberOfHexagonOnY); ++columnIndex) {
				
				let renderPoint = new Coordinates(index, columnIndex);
				
				this._renderPointOnTerrain.push(renderPoint);
				
				if (this._hexagons.find((hexagon) => {
						let position = hexagon.getPositionOnTerrain();
						return position.x === index && position.y === columnIndex;
					})
				) {
					continue;
				}
				
				let hexagon = new Hexagon({
					assetData: TerrainChain.getTerrainAssetData(new Coordinates(renderStartingPointX + index, renderStartingPointY + columnIndex)),
					terrain: this,
				}).initResources(
					this._resources,
				).setDimensions({
					height,
					width,
				});
				
				hexagon.setPositionOnTerrain(renderPoint);
				
				this._isPointsOnTerrainChanged = true;
				
				this.addHexagon(hexagon);
			}
		}
		
		return this;
	}
	
	/**
	 * render function
	 * @param delta {number}
	 * @override
	 */
	render(delta) {
		this.tick(delta);
		this.onRender(delta);
	}
	
	/**
	 * dispose element on the map or in memory
	 * @param option {boolean}
	 * @override
	 */
	dispose(option) {
		this._container.destroy({children: true, texture: true, baseTexture: true});
		this._container = null;
	}
}

export default Terrain;