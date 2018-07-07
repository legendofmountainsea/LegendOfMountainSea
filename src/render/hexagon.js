//@flow

import Pattern from './pattern';
import Terrain from './terrain';
import Coordinates from '../core/coordinates';

export const COS_30_DEGREES = Math.cos(Math.PI / 6);

type HexagonPropsType = {
    terrain: Terrain,
    position: Coordinates,
}

/**
 * class for rendering a hexagon grid on terrain
 * @param props {Object}
 * @param props.terrain {Terrain}
 * @extends Pattern
 */
class Hexagon extends Pattern {
    constructor(props: HexagonPropsType) {
        super(props);
        this._height = 0;
        this._width = 0;
        this._terrain = props.terrain;
        this._positionOnTerrain = null;
        //this._data = props.data ? props.data : {};
    }

    initResources(resources: Object) {
        super.initResources(resources);

        this._sprite.interactive = true;
        this._sprite.mouseup = (e) => {
            this._stage.onClickEventTrigger(this);


            // let worldTransformX = this._terrain._container.worldTransform.tx,
            //     worldTransformY = this._terrain._container.worldTransform.ty;
            //
            // console.log(worldTransformX, worldTransformY);
            //
            // worldTransformX = this._sprite.worldTransform.tx;
            // worldTransformY = this._sprite.worldTransform.ty;
            //
            // console.log(worldTransformX, worldTransformY);
            //
            // console.log((this._width / 2) + this._positionOnTerrain.x * (this._height * COS_30_DEGREES ),
            //     this._positionOnTerrain.y * this._height + (this._height / 2) * (1 + Math.abs(this._positionOnTerrain.x) % 2),)
        };

        return this;
    }

    // setData(data) {
    // 	this._data = data;
    // 	return this;
    // }

    getName(): string {
        return this._assetData.DATA.NAME;
    }

    /**
     * set hexagon dimensions info to tell render how to render correct position on terrain,
     * then set a hit area to avoid hit zone overlap
     * @param dimensions {Object}
     * @param dimensions.height {number}
     * @param dimensions.width {number}
     * @returns {Hexagon}
     */
    setDimensions(dimensions: { height: number, width: number }) {
        const {height, width} = dimensions;
        this._height = height;
        this._width = width;

        if (this._sprite) {
            this._sprite.hitArea = new PIXI.Circle(0, 0, this._height * 0.5);
        }
        return this;
    }

    onRender(delta: number) {
        if (this._sprite) {
            this._onRender(this._sprite, delta);
        }
        return this;
    }

    /**
     * set position on terrain with a grid position system
     * @param position {Coordinates} a grid position coordinates which x & y always is integer
     * @returns {Hexagon}
     */
    setPositionOnTerrain(position: Coordinates) {
        this._positionOnTerrain = position;
        this.adjustRenderPosition(position);

        return this;
    }

    /**
     * found right render position for the center of hexagon
     * @param position {Coordinates}
     * @returns {Hexagon}
     */
    adjustRenderPosition(position: Coordinates) {
        this.setPosition({
            x: (this._width / 2) + position.x * (this._height * COS_30_DEGREES ),
            y: position.y * this._height + (this._height / 2) * (1 + Math.abs(position.x) % 2),
        });

        return this;
    }

    /**
     * get hexagon position on terrain grid system
     * @returns {null|*}
     */
    getPositionOnTerrain() {
        return this._positionOnTerrain;
    }

    tick(delta: number) {
    }

    dispose(option: boolean = false) {
        super.dispose(option);
        this._positionOnTerrain = null;
    }
}

export default Hexagon;