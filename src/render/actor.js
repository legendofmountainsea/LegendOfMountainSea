import ElementCore from './elementCore';

/**
 * class for rendering interactive element in the game
 * @extends ElementCore
 */
class Actor extends ElementCore{
	constructor(props) {
		props = props || {};
		super(props);
		this._position = null;
		this._initPosition = props.position ? props.position : {x: 0, y: 0};
		this._onRender = props.onRender ? props.onRender : () => {
		};
		this._sprite = null;
		this._onClick = props.onClick ? props.onClick : null;
		this._assetData = props.assetData;
	}
	
	DIRECTION_RIGHT = 1;
	DIRECTION_LEFT = -1;
	
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
		return this._position? this._position : this._initPosition;
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
	
	dispose(option = false){
		const disposeChildren = option;
		this._sprite.destroy({children: disposeChildren, texture: disposeChildren, baseTexture: disposeChildren});
		this._sprite = null;
		
		this._initPosition = null;
		this._onRender = null;
		this._onClick = null;
		this._noAsset = null;
		this._assetData = null;
	}
}

export default Actor;