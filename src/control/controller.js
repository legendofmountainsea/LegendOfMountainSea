export default class Controller {
	constructor(props) {
		this._mouse = props.mouse ? props.mouse : null;
		this._pawn = null;
		this._bindKeyboardEvent();
	}
	
	_bindKeyboardEvent() {
		document.addEventListener('keyup', this._onKeyDown.bind(this), false);
	}
	
	_onKeyDown(event) {
		if (!this._pawn) {
			return;
		}
		const keyName = event.key;
		
		switch (keyName) {
			case 'a':
			case 'A':
				this._pawn.onPressKeyA(event);
				break;
			case 'b':
			case 'B':
				this._pawn.onPressKeyB(event);
				break;
			case 'd':
			case 'D':
				this._pawn.onPressKeyD(event);
				break;
			case 'u':
			case 'U':
				this._pawn.onPressKeyU(event);
				break;
			default:
				break;
		}
	}
	
	getMouseInstance() {
		return this._mouse;
	}
	
	bindMouseOnRightEdge(onRightEdge) {
		this._mouse.bindOnRightEdge(onRightEdge);
		return this;
	}
	
	bindMouseOnLeftEdge(onLeftEdge) {
		this._mouse.bindOnLeftEdge(onLeftEdge);
		return this;
	}
	
	bindMouseOnTopEdge(onTopEdge) {
		this._mouse.bindOnTopEdge(onTopEdge);
		return this;
	}
	
	bindMouseOnBottomEdge(onBottomEdge) {
		this._mouse.bindOnBottomEdge(onBottomEdge);
		return this;
	}
	
	bindOnMouseMove(onMouseMove) {
		this._mouse.bindOnMouseMove(onMouseMove);
		return this;
	}
	
	setMousePosition(position) {
		this._mouse.showAtPosition(position);
	}
	
	setMouseOutEdge(isOut) {
		this._mouse.setOut(isOut);
		this._mouse.setMouseDown(false);
	}
	
	onMouseUp(e){
		this._mouse.onMouseUp(e);
	}
	
	onMouseDown(e) {
		this._mouse.onMouseDown(e);
		
		if (!this._pawn) {
			return;
		}
		this._pawn.onMouseDown(e);
	}
	
	onMouseMove(position) {
		if(this._mouse.isDown()){
			this._mouse.onMouseMove(position);
		}
		else {
			this._mouse.showAtPosition(position);
		}
	}
	
	possess(pawn) {
		this._pawn = pawn;
	}
}