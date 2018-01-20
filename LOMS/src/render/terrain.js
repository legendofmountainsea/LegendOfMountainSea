import ElementCore from './elementCore';
import LayerAgent from './layerAgent';
import HexagonRegion from './hexagonRegion';

export default class Terrain extends ElementCore {
	//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/40
	constructor(props) {
		super(props);
		this._coordinates = props.coordinates? props.coordinates : {x:0,y:0};
		this._container = null;
		this._resources = null;
		this._noAsset = !props.assetData;
		this._assetData = props.assetData;
		this._runtimeRenderSize = 5;
		this._preRenderSize = 5;
		this._hexagonRegions = [];
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
		this._createHexagonRegion(this._coordinates);
		
		return this;
	}
	
	getRenderObject() {
		return this._container;
	}
	
	setTransform(transform){
		
		this._coordinates.x += transform.x;
		this._coordinates.y += transform.y;
		
		const isGenerate = this._hexagonRegions.find((hexagonRegions) => {
			return hexagonRegions.isContainedCoordinates(this._coordinates);
		});
		
		if(!isGenerate){
			this._createHexagonRegion(this._coordinates);
		}

		for(let hexagonRegion of this._hexagonRegions){
			hexagonRegion.setTransform(transform);
		}
	}
	
	_createHexagonRegion(coordinates){
		const hexagonRegion = new HexagonRegion({
			coordinates: coordinates,
			assetData: this._assetData,
		}).initResources(this._resources);
		
		this._hexagonRegions.push(hexagonRegion);
		
		this._layerAgent.addElement(hexagonRegion, 0);
	}
	
	tick(delta) {
		
		if(!this._container){
			return;
		}
		
		this.renderHexagonRegion(delta);
	}
	
	onRender(delta) {
	
	}
	
	renderHexagonRegion(delta){
		
		for(let hexagonRegion of this._hexagonRegions){
			hexagonRegion.render(delta);
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