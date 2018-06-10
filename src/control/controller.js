//@flow

type ControllerProps = {
	mouse: Object;
}

/**
 * class for gamer input control
 */
class Controller {

	_mouse: Object;
	_pawn: Object | null;

	/**
	 * create player input controller
	 * @param props {object}
	 */
	constructor(props: ControllerProps) {
		this._mouse = props.mouse;
		this._pawn = null;
		this._bindKeyboardEvent();
	}

	_bindKeyboardEvent(): Controller {
		document.addEventListener('keyup', this._onKeyDown.bind(this), false);
		return this;
	}

	_onKeyDown(event: KeyboardEvent): void {
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

	/**
	 * get mouse instance
	 * @returns {Mouse}
	 */
	getMouseInstance() {
		return this._mouse;
	}

	bindMouseOnRightEdge(onRightEdge: any => any): Controller {
		this._mouse.bindOnRightEdge(onRightEdge);

		return this;
	}

	bindMouseOnLeftEdge(onLeftEdge: any => any): Controller {
		this._mouse.bindOnLeftEdge(onLeftEdge);

		return this;
	}

	bindMouseOnTopEdge(onTopEdge: any => any): Controller {
		this._mouse.bindOnTopEdge(onTopEdge);

		return this;
	}

	bindMouseOnBottomEdge(onBottomEdge: any => any): Controller {
		this._mouse.bindOnBottomEdge(onBottomEdge);

		return this;
	}

	bindOnMouseDrag(onMouseMove: any => any): Controller {
		this._mouse.bindOnMouseDrag(onMouseMove);

		return this;
	}

	setMousePosition(position: Object): Controller {
		this._mouse.showAtPosition(position);

		return this;
	}

	setMouseOutEdge(isOut: boolean): Controller {
		this._mouse.setOut(isOut);
		this._mouse.setMouseDown(false);

		return this;
	}


	onMouseUp(e: KeyboardEvent) {
		if (this._mouse.isOut()) {
			return;
		}

		this._mouse.onMouseUp(e);
	}

	/**
	 * when mouse button is down, this function will be trigger
	 * @param e {event} mouse event object
	 */
	onMouseDown(e: KeyboardEvent) {
		if (this._mouse.isOut()) {
			return;
		}

		this._mouse.onMouseDown(e);
	}

	onMouseClick(e: Object) {
		if (this._mouse.isOut()) {
			return;
		}

		if (!this._pawn) {
			return;
		}
		this._pawn.onMouseClick(e);
	}

	onMouseMove(position: Object) {
		if (this._mouse.isOut()) {
			return;
		}

		if (this._mouse.isDown()) {
			this._mouse.onMouseDrag(position);
		}
		else {
			this._mouse.showAtPosition(position);
		}
	}

	/**
	 * possess a pawn to control
	 * @param pawn {Pawn}
	 */
	possess(pawn: Object): Controller {
		this._pawn = pawn;
		return this;
	}
}

export default Controller;