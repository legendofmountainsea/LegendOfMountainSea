import Hexagon, {COS_60_DEGREES} from './hexagon';
import LayerAgent from './layerAgent';
import ElementCore from './elementCore';

export default class HexagonRegion extends ElementCore {
	constructor(props) {
		super(props);
		this._container = null;
		this._layerAgent = null;
		this._coordinates = props.coordinates;
		this._resources = props.resources;
		this._assetData = props.assetData;
		this._runtimeRenderSize = 5;
		this._isInit = false;
		this._hexagons = [];
	}
	
	_initLayerAgent() {
		this._container = new PIXI.Container();
		this._layerAgent = new LayerAgent({contatiner: this._container});
	}
	
	getRenderObject() {
		return this._container;
	}
	
	getCoordinates() {
		return this._coordinates;
	}
	
	setTransform(transform){
		if(this._container){
			this._container.x += transform.x;
			this._container.y += transform.y;
		}
		
		return this;
	}
	
	_addHexagon(hexagon) {
		this._hexagons.push(hexagon);
		this._layerAgent.addElement(hexagon, 0);
	}
	
	initResources(resources) {
		this._resources = resources;
		
		this._initLayerAgent();
		
		this._initHexagons();
		
		return this;
	}
	
	isContainedCoordinates(coordinates) {
		const terrainResource = this._resources[this._assetData.DATA.NAME];
		const {height} = terrainResource.texture;
		
		const coordinateX = - parseInt(coordinates.x / (height * COS_60_DEGREES)),
			coordinateY = - parseInt(coordinates.y / height);
		
		const isContainedCoordinatesX = (coordinateX > this._topLeftX && coordinateX < this._topLeftX + this._runtimeRenderSize),
			isContainedCoordinatesY = (coordinateY > this._topLeftY && coordinateY < this._topLeftY + this._runtimeRenderSize);
		
		return (isContainedCoordinatesX && isContainedCoordinatesY);
	}
	
	_initHexagons() {
		const terrainResource = this._resources[this._assetData.DATA.NAME];
		const {height, width} = terrainResource.texture;
		
		this._topLeftX = - parseInt(this._coordinates.x / (height * COS_60_DEGREES));
		this._topLeftY = - parseInt(this._coordinates.y / height);
		
		for (let index = this._topLeftX; index < this._topLeftX + this._runtimeRenderSize; ++index) {
			for (let columnIndex = this._topLeftY; columnIndex < this._topLeftY + this._runtimeRenderSize; ++columnIndex) {
				
				let hexagon = new Hexagon({assetData: this._assetData}).initResources(this._resources).setDimensions({
					height,
					width,
				});
				
				hexagon.setPositionOnTerrain({
					x: index,
					y: columnIndex,
				});
				
				this._addHexagon(hexagon);
			}
		}
	}
	
	onRender(delta) {
	}
	
	tick(delta) {
	}
	
	render(delta) {
		this.tick(delta);
		this.onRender(delta);
	}
}