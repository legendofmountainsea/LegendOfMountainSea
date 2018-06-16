import Pattern from './pattern';

export const COS_30_DEGREES = Math.cos(Math.PI / 6);

/**
 * class for rendering a hexagon grid on terrain
 * @extends Pattern
 */
class Hexagon extends Pattern {
	constructor(props) {
		props = props || {};
		super(props);
		this._height = 0;
		this._width = 0;
		this._terrain = props.terrain;
		this._positionOnTerrain = null;
		this._data = props.data ? props.data : {};
	}

	initResources(resources) {
		super.initResources(resources);

		this._sprite.interactive = true;
		this._sprite.mouseup = (e) => {
			this._stage.onClickEventTrigger(this);
		};

		return this;
	}

	setData(data) {
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

		if (this._sprite) {
			this._sprite.hitArea = new PIXI.Circle(0, 0, this._height * 0.5);
		}
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
		this.adjustRenderPosition(position);

		return this;
	}

	/**
	 * found right render position for the center of hexagon
	 * @param position {Coordinates}
	 * @returns {Hexagon}
	 */
	adjustRenderPosition(position) {
		this.setPosition({
			x: (this._width / 2) + position.x * (this._height * COS_30_DEGREES ),
			y: position.y * this._height + (this._height / 2) * (1 + Math.abs(position.x) % 2),
		});

		return this;
	}

	getPositionOnTerrain() {
		return this._positionOnTerrain;
	}

	tick(delta) {
	}

	dispose(option) {
		super.dispose(option);
		this._positionOnTerrain = null;
	}
}

export default Hexagon;