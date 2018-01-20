import ElementCore from './elementCore';
export default class Actor extends ElementCore{
	constructor(props) {
		super(props);
		this._position = null;
		this._initPosition = props.position ? props.position : {x: 0, y: 0};
		this._onRender = props.onRender ? props.onRender : () => {
		};
		this._sprite = null;
		this._onClick = props.onClick ? props.onClick : null;
		this._noAsset = !props.assetData;
		this._assetData = props.assetData;
	}
	
	DIRECTION_RIGHT = 1;
	DIRECTION_LEFT = -1;
	
	isNoAsset() {
		return this._noAsset;
	}
	
	getRenderObject() {
		return this._sprite;
	}
	
	setTransform(transform){
		if(this._sprite){
			this._sprite.x += transform.x;
			this._sprite.y += transform.y;
		}
		return this;
	}
	
	setPosition(position) {
		this._position = position;
		if (this._sprite) {
			this._sprite.x = position.x;
			this._sprite.y = position.y;
		}
		
		return this;
	}
	
	getPosition(){
		return this._position;
	}
	
	bindRender(onRender) {
		this._onRender = onRender;
		return this;
	}
	
	render(delta) {
		this.tick(delta);
		this.onRender(delta);
	}
	
	onRender(delta) {
		if (this._sprite) {
			this._onRender(this._sprite, delta);
		}
	}
	
	tick(delta) {
		//override in subClass
	}
	
	dispose(){
		this._sprite.destroy({children:true, texture:true, baseTexture:true});
		this._sprite = null;
		
		this._initPosition = null;
		this._onRender = null;
		this._onClick = null;
		this._noAsset = null;
		this._assetData = null;
	}
}