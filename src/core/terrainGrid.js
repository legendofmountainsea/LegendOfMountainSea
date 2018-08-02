//@flow
import Grid from './grid';
import Coordinates from './coordinates';
import Cube from './cube';

type TerrainGridPropsType = {
	point: Coordinates,
};

/**
 * class of terrain grid which provide navigation algorithm for terrain
 * @extends Grid
 */
class TerrainGrid extends Grid {
	/**
	 * create a terrain grid
	 * @param props {Object}
	 * @param props.point {Coordinates} position on terrain
	 */
	constructor(props: TerrainGridPropsType) {
		super(props);
	}

	// getData(center, range) {
	//
	// 	const length = range.radius * 2 + 1,
	// 		coordinatesSet = [];
	//
	// 	for (let index = 0; index < length; ++index) {
	// 		let blockRow = [];
	// 		for (let columnIndex = 0; columnIndex < length; ++columnIndex) {
	// 			let coordinatesX = center.x - (range.radius - 1) - Math.floor(index / 2) + columnIndex,
	// 				coordinatesY = center.y - range.radius + index;
	// 			blockRow.push(new Coordinates(coordinatesX, coordinatesY));
	// 		}
	// 		coordinatesSet.push(blockRow);
	// 	}
	//
	// 	return coordinatesSet;
	// }

	/**
	 * convert to cube Coordinates system
	 * @returns {Cube}
	 */
	convertToCube():Cube {
		let z = this._point.y - (this._point.x - (this._point.x & 1)) / 2;
		let y = -this._point.x - z;
		return Cube(this._point.x, y, z);
	}

	/**
	 * get neighbor grid
	 * @returns {Array}
	 */
	getNeighbor(): Array<Grid> {

		const currentPoint = this._point;

		const neighborPoints = [new Coordinates(currentPoint.x - 1, currentPoint.y - 1), new Coordinates(currentPoint.x - 1, currentPoint.y),
			new Coordinates(currentPoint.x, currentPoint.y + 1), new Coordinates(currentPoint.x + 1, currentPoint.y),
			new Coordinates(currentPoint.x + 1, currentPoint.y - 1), new Coordinates(currentPoint.x, currentPoint.y - 1)];

		const neighborGrids = [];

		for (const point of neighborPoints){
			neighborGrids.push(new TerrainGrid({point:point}));
		}

		return neighborGrids;
	}

	/**
	 * get distance to cube
	 * @param grid {Grid}
	 * @returns {number}
	 */
	distanceTo(grid: Grid): number {
		const gridToCube = grid.convertToCube();
		return this.convertToCube().distanceTo(gridToCube);
	}
}

export default TerrainGrid;