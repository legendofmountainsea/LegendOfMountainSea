import Element from './element';

const MOUSE_DEFAULT_TEXTURE_PATH = '../../assets/interface/mouse.png';
const MOUSE_UP_TEXTURE_PATH = '../../assets/interface/mouseUp.png';
const MOUSE_DOWN_TEXTURE_PATH = '../../assets/interface/mouseDown.png';
const MOUSE_LEFT_TEXTURE_PATH = '../../assets/interface/mouseLeft.png';
const MOUSE_RIGHT_TEXTURE_PATH = '../../assets/interface/mouseRight.png';
const EDGE_LENGHT = 8;

export default class Mouse extends Element {
	
	constructor(props) {
		super(props);
		this._isOut = false;
		this._sprite = null;
		this._status = null;
		this._onStatusLeftEdge = ()=>{
			console.warn('use bindOnLeftEdge function to bind mouse event');
		};
		this._onStatusRightEdge = ()=>{
			console.warn('use bindOnRightEdge function to bind mouse event');
		};
		this._onStatusTopEdge = ()=>{
			console.warn('use bindOnTopEdge function to bind mouse event');
		};
		this._onStatusBottomEdge= ()=>{
			console.warn('use bindOnBottomEdge function to bind mouse event');
		};
		this._hitArea = props.hitArea;
	}
	
	STATUS_INSIDE = 'STATUS_INSIDE';
	STATUS_TOP_EDGE = 'STATUS_TOP_EDGE';
	STATUS_BOTTOM_EDGE = 'STATUS_BOTTOM_EDGE';
	STATUS_LEFT_EDGE = 'STATUS_LEFT_EDGE';
	STATUS_RIGHT_EDGE = 'STATUS_RIGHT_EDGE';
	
	init() {
		this.TEXTURE_DEFAULT = new PIXI.Texture.fromImage(MOUSE_DEFAULT_TEXTURE_PATH);
		this.TEXTURE_UP = new PIXI.Texture.fromImage(MOUSE_UP_TEXTURE_PATH);
		this.TEXTURE_DOWN = new PIXI.Texture.fromImage(MOUSE_DOWN_TEXTURE_PATH);
		this.TEXTURE_LEFT = new PIXI.Texture.fromImage(MOUSE_LEFT_TEXTURE_PATH);
		this.TEXTURE_RIGHT = new PIXI.Texture.fromImage(MOUSE_RIGHT_TEXTURE_PATH);
		
		this._sprite = new PIXI.Sprite(this.TEXTURE_DEFAULT);
		return this;
	}
	
	getElement() {
		return this._sprite;
	}
	
	showAtPosition(position) {
		this._setPosition(position);
		
		this._checkPosition(this._sprite.getBounds());
		
		return this;
	}
	
	_setPosition(position) {
		if (this._sprite) {
			this._sprite.position.x = position.x;
			this._sprite.position.y = position.y;
		}
		
		return this;
	}
	
	setOut(isMouseOut) {
		this._isOut = isMouseOut;
		return this;
	}
	
	setStatus(status) {
		this._status = status;
	}
	
	isOut() {
		return this._isOut;
	}
	
	_checkPosition(bounds) {
		
		if (bounds.y <= EDGE_LENGHT && bounds.x < this._hitArea.width) {
			this.setStatus(this.STATUS_TOP_EDGE);
			this._setPosition({
				x: Math.min(bounds.x, this._hitArea.width - bounds.width),
				y: bounds.y,
			});
		}
		else if (bounds.x <= EDGE_LENGHT && bounds.y < this._hitArea.height) {
			this.setStatus(this.STATUS_LEFT_EDGE);
			this._setPosition({
				x: bounds.x,
				y: Math.min(bounds.y, this._hitArea.height - bounds.height),
			});
		}
		else if (bounds.y >= this._hitArea.height) {
			this.setStatus(this.STATUS_BOTTOM_EDGE);
			this._setPosition({
				x: Math.min(bounds.x, this._hitArea.width - bounds.width),
				y: this._hitArea.height - bounds.height,
			});
		}
		else if (bounds.x >= this._hitArea.width) {
			this.setStatus(this.STATUS_RIGHT_EDGE);
			this._setPosition({
				x: this._hitArea.width - bounds.width,
				y: Math.min(bounds.y, this._hitArea.height - bounds.height),
			});
		}
		else {
			this.setStatus(this.STATUS_INSIDE);
		}
	}
	
	_checkStatus(delta) {
		switch (this._status) {
			case this.STATUS_TOP_EDGE:
				this._sprite.texture = this.TEXTURE_UP;
				this._onStatusTopEdge(delta);
				break;
			case this.STATUS_BOTTOM_EDGE:
				this._sprite.texture = this.TEXTURE_DOWN;
				this._onStatusBottomEdge(delta);
				break;
			case this.STATUS_LEFT_EDGE:
				this._sprite.texture = this.TEXTURE_LEFT;
				this._onStatusLeftEdge(delta);
				break;
			case this.STATUS_RIGHT_EDGE:
				this._sprite.texture = this.TEXTURE_RIGHT;
				this._onStatusRightEdge(delta);
				break;
			case this.STATUS_INSIDE:
				this._sprite.texture = this.TEXTURE_DEFAULT;
				break;
			default:
				break;
		}
	}
	
	bindOnRightEdge(onRightEdge){
		this._onStatusRightEdge = onRightEdge;
		return this;
	}
	
	bindOnLeftEdge(onLeftEdge){
		this._onStatusLeftEdge = onLeftEdge;
		return this;
	}
	
	bindOnTopEdge(onTopEdge){
		this._onStatusTopEdge = onTopEdge;
		return this;
	}
	
	bindOnBottomEdge(onBottomEdge){
		this._onStatusBottomEdge = onBottomEdge;
		return this;
	}
	
	getPosition() {
		return this._sprite.position;
	}
	
	tick(delta) {
		this._checkStatus(delta);
	}
	
	render(delta) {
		this.tick(delta);
	}
	
	dispose() {
		this._sprite.destroy({
			children: true,
			texture: true,
			baseTexture: true,
		});
		this._sprite = null;
	}
}
