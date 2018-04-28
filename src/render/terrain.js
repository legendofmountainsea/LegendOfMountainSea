import ElementCore from './elementCore';
import Hexagon, {COS_60_DEGREES} from './hexagon';
import LayerAgent from './layerAgent';
import TerrainChain from '../chain/terrainChain';

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
		this._coordinates = props.coordinates ? props.coordinates : {x: 0, y: 0};
		this._noAsset = !props.assetData;
		this._assetData = props.assetData;
		this._runtimeRenderSize = 5;
		this._preRenderSize = 5;
		this._hexagons = [];
		this._renderPointOnTerrain = [];
	}
	
	/**
	 * create terrain layer to manage render elements
	 * @returns {Terrain}
	 * @private
	 */
	_initLayerAgent() {
		this._container = new PIXI.Container();
		this._layerAgent = new LayerAgent({contatiner: this._container});
		
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
		
		this.setTransform({x: 0, y: 0});
		
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
		
		this.renderHexagonRegion({
			x: this._coordinates.x,
			y: this._coordinates.y,
		});
		
		return this;
	}

    /**
	 * flush current terrain in memory, save render coordinates in TerrainChain for re-render
     * @returns {Terrain}
     */
	flush() {
		TerrainChain.updateCenterCoordinates({...this._coordinates});
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
	
	removeHexagon(hexagon) {
		for (let index = 0; index < this._hexagons.length; ++index) {
			if (this._hexagons[index].getID() === hexagon.getID()) {
				this._hexagons.splice(index, 1);
				break;
			}
		}
		
		this._layerAgent.removeElement(hexagon);
	}
	
	getRenderObject() {
		return this._container;
	}
	
	getPosition(){
		return {
			x: this._container.x,
			y: this._container.y,
		};
	}
	
	tick(delta) {
		if (!this._isPointsOnTerrainChanged) {
			return;
		}
		this.hexagonRenderRecycle();
	}
	
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
		const centerCoordinates = TerrainChain.getCenterCoordinates();
		const {height, width} = terrainResource.texture;
		
		const topLeftX = -parseInt(topLeft.x / (height * COS_60_DEGREES)),
			topLeftY = -parseInt(topLeft.y / height);
		
		const centerRenderPointX = -parseInt(centerCoordinates.x / (height * COS_60_DEGREES)),
			centerRenderPointY = -parseInt(centerCoordinates.y / height);
		
		this._renderPointOnTerrain = [];
		
		for (let index = topLeftX - this._preRenderSize; index < topLeftX + this._runtimeRenderSize; ++index) {
			for (let columnIndex = topLeftY - this._preRenderSize; columnIndex < topLeftY + this._runtimeRenderSize; ++columnIndex) {
				
				this._renderPointOnTerrain.push({x: index, y: columnIndex});
				
				if (this._hexagons.find((hexagon) => {
						let position = hexagon.getPositionOnTerrain();
						return position.x === index && position.y === columnIndex;
					})
				) {
					continue;
				}
				
				let hexagon = new Hexagon({
					assetData: TerrainChain.getTerrainAssetData({x:centerRenderPointX + index,y:centerRenderPointY + columnIndex}),
					terrain: this,
				}).initResources(
					this._resources,
				).setDimensions({
					height,
					width,
				});
				
				hexagon.setPositionOnTerrain({
					x: index,
					y: columnIndex,
				});
				
				this._isPointsOnTerrainChanged = true;
				
				this.addHexagon(hexagon);
			}
		}
		
		return this;
	}
	
	render(delta) {
		this.tick(delta);
		this.onRender(delta);
	}
	
	dispose() {
		this._container.destroy({children: true, texture: true, baseTexture: true});
		this._container = null;
	}
}

export default Terrain;