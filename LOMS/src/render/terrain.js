import ElementCore from './elementCore';
import Hexagon from './hexagon';
import LayerAgent from './layerAgent';

export default class Terrain extends ElementCore {
	//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/40
	constructor(props) {
		super(props);
		this._container = null;
		this._resources = null;
		this._noAsset = !props.assetData;
		this._assetData = props.assetData;
		this._runtimeRenderSize = 10;
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
		
		return this;
	}
	
	addHexagon(hexagon) {
		this._hexagons.push(hexagon);
		this._layerAgent.addElement(hexagon, 0);
	}
	
	getElement() {
		return this._container;
	}
	
	tick(delta) {
		
		if(!this._container){
			return;
		}
		
		this.renderHexagonRegion({
			x: this._container.x,
			y: this._container.y,
		});
	}
	
	onRender(delta) {
	
	}
	
	renderHexagonRegion(topLeft){
		const terrainResource = this._resources[this._assetData.DATA.NAME];
		const {height, width} = terrainResource.texture;
		
		const topLeftX = - parseInt(topLeft.x / width),
			topLeftY = - parseInt(topLeft.y / height);
		
		for (let index = topLeftX - this._preRenderSize; index < topLeftX + this._runtimeRenderSize; ++index) {
			for (let columnIndex = topLeftY - this._preRenderSize; columnIndex < topLeftY + this._runtimeRenderSize; ++columnIndex) {
				
				if (this._hexagons.find((hexagon) => {
						let position = hexagon.getPosition();
						return position.x === index && position.y === columnIndex;
					})
				) {
					continue;
				}
				
				let hexagon = new Hexagon({assetData: this._assetData}).initResources(this._resources).setDimensions({
					height,
					width,
				});
				
				hexagon.setPosition({
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