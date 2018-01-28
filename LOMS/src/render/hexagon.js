import Pattern from './pattern';

export const COS_60_DEGREES = Math.cos(Math.PI / 6);

export default class Hexagon extends Pattern {
	constructor(props) {
		super(props);
		this._height = 0;
		this._width = 0;
		this._terrain = props.terrain;
		this._positionOnTerrain = null;
		this._renderPosition = null;
		this._data = props.data? props.data : {};
	}
	
	initResources(resources){
		super.initResources(resources);
		
		this._sprite.interactive = true;
		this._sprite.buttonMode = true;
		this._sprite.mousedown = (e) => {
			this._terrain.flush();
			//console.log(this._data);
		};
		
		return this;
	}
	
	setData(data){
		this._data = data;
		return this;
	}
	
	getName() {
		return this._assetData.DATA.NAME;
	}

	setDimensions(dimensions) {
		const {height, width} = dimensions;
		this._height = height;
		this._width = width;
		return this;
	}
	
	onRender(delta) {
		if (this._sprite) {
			this._onRender(this._sprite, delta);
		}
		return this;
	}
	
	setPositionOnTerrain(position) {
		this._positionOnTerrain = position;
		this.setRenderPosition(position);
		if (this._sprite) {
			this._sprite.x = this._renderPosition.x;
			this._sprite.y = this._renderPosition.y;
		}
		
		return this;
	}
	
	setRenderPosition(position) {
		this._renderPosition = {
			x: (this._width / 2) + position.x * (this._height * COS_60_DEGREES ),
			y: position.y * this._height + (this._height / 2) * (1 + Math.abs(position.x) % 2),
		};
		
		return this;
	}
	
	getPositionOnTerrain() {
		return this._positionOnTerrain;
	}
	
	getRenderPosition() {
		return this._renderPosition;
	}
	
	tick(delta) {
		//override in subClass
	}
	
	dispose(option) {
		super.dispose(option);
		this._positionOnTerrain = null;
		this._renderPosition = null;
	}
}