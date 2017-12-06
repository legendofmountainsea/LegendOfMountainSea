import Element from './element';
import Hexagon from './hexagon';
import LayerAgent from './layerAgent';

export default class Terrain extends Element {
	//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/40
	constructor(props) {
		super(props);
		this._noAsset = !props.assetData;
		this._container = null;
		this._assetData = props.assetData;
		this._center = props.center? props.center : {
			x: 0, y: 0,
		};
		this._runtimeRenderSize = 10;
		this._preRenderSize = 5;
	}
	
	isNoAsset() {
		return this._noAsset;
	}
	
	_initLayerAgent() {
		this._layerAgent = new LayerAgent({contatiner: this._container});
	}
	
	initResources(resources) {
		this._container = new PIXI.Container();
		
		this._initLayerAgent();
		const terrainResource = resources[this._assetData.DATA.NAME];
		const {height, width} = terrainResource.texture;
		
		const currentX = this._center.x,
			currentY = this._center.y;
		
		for (let index = currentX - this._preRenderSize; index < currentX + this._runtimeRenderSize; ++index) {
			for (let columnIndex = currentY - this._preRenderSize; columnIndex < currentY + this._runtimeRenderSize; ++columnIndex) {
				
				let hexagon = new Hexagon({assetData: this._assetData}).initResources(resources).setDimensions({
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
		return this;
	}
	
	addHexagon(hexagon) {
		this._layerAgent.addElement(hexagon, 0);
	}
	
	getElement() {
		return this._container;
	}
	
	tick(delta) {
	
	}
	
	onRender(delta) {
	
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