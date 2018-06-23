//@flow

/**
 * class of render object's coordinates
 */
class Coordinates {
	x: number;
	y: number;
	/**
	 * create a coordinates
	 * @param x {number}
	 * @param y {number}
	 */
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	
	/**
	 * set coordinates data
	 * @param coordinates {Coordinates}
	 * @returns {Coordinates}
	 */
	set(coordinates: Coordinates) {
		this.x = coordinates.x;
		this.y = coordinates.y;
		return this;
	}
}

export default Coordinates;