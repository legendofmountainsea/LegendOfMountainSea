//@flow
import Coordinates from './coordinates';

export type GridPropsType = {
    point: Coordinates,
}

/**
 * class of a Grid which provide a navigation algorithm
 */
class Grid {

	_point: Coordinates;

	/**
	 * Grid's constructor function
	 * @param props {Object}
	 */
	constructor(props: GridPropsType) {
        this._point = props.point;
	}

	/**
	 * get distance to cube
	 * @param grid {Grid}
	 * @returns {number}
	 */
	distanceTo(grid: Grid){
		return 0;
	}
}

export default Grid;