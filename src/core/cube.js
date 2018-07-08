import Coordinates from './coordinates';

/**
 * class of a Cube which provide a better navigation algorithm for grids
 */
class Cube {
	/**
	 * create a cube coordinates system
	 * @param x
	 * @param y
	 * @param z
	 */
	constructor(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	/**
	 * convert self to the offset coordinates system
	 * @returns {Coordinates}
	 */
	convertToGridCoordinates(){
		let row = this.z + (this.x - (this.x & 1)) / 2;
		return new Coordinates(this.x, row);
	}

	/**
	 * get distance to cube
	 * @param cube {Cube}
	 * @returns {number}
	 */
	distanceTo(cube){
		return Math.max(Math.abs(this.x - cube.x), Math.abs(this.y - cube.y), Math.abs(this.z - cube.z));
	}
}

export default Cube;