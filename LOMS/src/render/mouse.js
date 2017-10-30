const MOUSE_DEFAULT_TEXTURE_PATH = '../../assets/mouse.png';
const MOUSE_UP_TEXTURE_PATH = '../../assets/mouseUp.png';
const MOUSE_DOWN_TEXTURE_PATH = '../../assets/mouseDown.png';
const MOUSE_LEFT_TEXTURE_PATH = '../../assets/mouseLeft.png';
const MOUSE_RIGHT_TEXTURE_PATH = '../../assets/mouseRight.png';
const EDGE_LENGHT = 8;

export default class Mouse {
	
	constructor(props) {
		this._isOut = false;
		this._sprite = null;
		this._status = null;
		this._hitArea = props.hitArea;
	}
	
	STATUS_INSIDE = 'STATUS_INSIDE';
	STATUS_UP = 'STATUS_UP';
	STATUS_DOWN = 'STATUS_DOWN';
	STATUS_LEFT = 'STATUS_LEFT';
	STATUS_RIGHT = 'STATUS_RIGHT';
	
	init() {
		this.TEXTURE_DEFAULT = new PIXI.Texture.fromImage(MOUSE_DEFAULT_TEXTURE_PATH);
		this.TEXTURE_UP = new PIXI.Texture.fromImage(MOUSE_UP_TEXTURE_PATH);
		this.TEXTURE_DOWN = new PIXI.Texture.fromImage(MOUSE_DOWN_TEXTURE_PATH);
		this.TEXTURE_LEFT = new PIXI.Texture.fromImage(MOUSE_LEFT_TEXTURE_PATH);
		this.TEXTURE_RIGHT = new PIXI.Texture.fromImage(MOUSE_RIGHT_TEXTURE_PATH);
		
		this._sprite = new PIXI.Sprite(this.TEXTURE_DEFAULT);
		return this;
	}
	
	getSprite() {
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
			this.setStatus(this.STATUS_UP);
			this._setPosition({x: Math.min(bounds.x, this._hitArea.width - bounds.width), y: bounds.y});
		}
		else if (bounds.x <= EDGE_LENGHT && bounds.y < this._hitArea.height) {
			this.setStatus(this.STATUS_LEFT);
			this._setPosition({x: bounds.x, y: Math.min(bounds.y, this._hitArea.height - bounds.height)});
		}
		else if (bounds.y >= this._hitArea.height) {
			this.setStatus(this.STATUS_DOWN);
			this._setPosition({
				x: Math.min(bounds.x, this._hitArea.width - bounds.width),
				y: this._hitArea.height - bounds.height,
			});
		}
		else if (bounds.x >= this._hitArea.width) {
			this.setStatus(this.STATUS_RIGHT);
			this._setPosition({
				x: this._hitArea.width - bounds.width,
				y: Math.min(bounds.y, this._hitArea.height - bounds.height),
			});
		}
		else {
			this.setStatus(this.STATUS_INSIDE);
		}
	}
	
	_checkStatus() {
		switch (this._status) {
			case this.STATUS_UP:
				this._sprite.texture = this.TEXTURE_UP;
				break;
			case this.STATUS_DOWN:
				this._sprite.texture = this.TEXTURE_DOWN;
				break;
			case this.STATUS_LEFT:
				this._sprite.texture = this.TEXTURE_LEFT;
				break;
			case this.STATUS_RIGHT:
				this._sprite.texture = this.TEXTURE_RIGHT;
				break;
			case this.STATUS_INSIDE:
				this._sprite.texture = this.TEXTURE_DEFAULT;
				break;
			default:
				break;
		}
	}
	
	getPosition() {
		return this._sprite.position;
	}
	
	tick(delta) {
		this._checkStatus();
	}
	
	render(delta) {
		this.tick(delta);
	}
}
