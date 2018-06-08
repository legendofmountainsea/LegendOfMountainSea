/**
 * class of a Cube which provide a better navigation algorithm for grids
 */
import Coordinates from './coordinates';

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
		let row = this.z + (this.x - (this.x&1)) / 2;
		return new Coordinates(this.x, row);
	}
}

export default Cube;