import ElementCore from './elementCore';
import Hexagon, {COS_60_DEGREES} from './hexagon';
import LayerAgent from './layerAgent';

export default class Terrain extends ElementCore {
	//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/40
	constructor(props) {
		super(props);
		this._container = null;
		this._resources = null;
		this._coordinates = props.coordinates ? props.coordinates : {x: 0, y: 0};
		this._noAsset = !props.assetData;
		this._assetData = props.assetData;
		this._runtimeRenderSize = 5;
		this._preRenderSize = 5;
		this._hexagons = [];
	}
	
	isNoAsset() {
		return this._noAsset;
	}
	
	_initLayerAgent() {
		this._container = new PIXI.Container();
		this._layerAgent = new LayerAgent({contatiner: this._container});
	}
	
	initResources(resources) {
		this._resources = resources;
		this._initLayerAgent();
		
		this.setTransform({x: 0, y: 0});
		
		return this;
	}
	
	setTransform(transform) {
		
		this._coordinates.x += transform.x;
		this._coordinates.y += transform.y;
		
		this._container.x = this._coordinates.x;
		this._container.y = this._coordinates.y;
		
		this.renderHexagonRegion({
			x: this._coordinates.x,
			y: this._coordinates.y,
		});
	}
	
	addHexagon(hexagon) {
		this._hexagons.push(hexagon);
		this._layerAgent.addElement(hexagon, 0);
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
	
	tick(delta) {
	
	}
	
	onRender(delta) {
	
	}
	
	renderHexagonRegion(topLeft) {
		const terrainResource = this._resources[this._assetData.DATA.NAME];
		const {height, width} = terrainResource.texture;
		
		const topLeftX = -parseInt(topLeft.x / (height * COS_60_DEGREES)),
			topLeftY = -parseInt(topLeft.y / height);
		
		for (let index = topLeftX - this._preRenderSize; index < topLeftX + this._runtimeRenderSize; ++index) {
			for (let columnIndex = topLeftY - this._preRenderSize; columnIndex < topLeftY + this._runtimeRenderSize; ++columnIndex) {
				
				if (this._hexagons.find((hexagon) => {
						let position = hexagon.getPositionOnTerrain();
						return position.x === index && position.y === columnIndex;
					})
				) {
					continue;
				}
				
				let hexagon = new Hexagon({assetData: this._assetData}).initResources(this._resources).setDimensions({
					height,
					width,
				});
				
				hexagon.setPositionOnTerrain({
					x: index,
					y: columnIndex,
				});
				
				this.addHexagon(hexagon);
			}
		}
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