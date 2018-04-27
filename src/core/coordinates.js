/**
 * class of render object's coordinates
 */
class Coordinates {
	/**
	 * create a coordinates
	 * @param x {number}
	 * @param y {number}
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	/**
	 * set coordinates data
	 * @param coordinates {Coordinates}
	 * @returns {Coordinates}
	 */
	set(coordinates) {
		this.x = coordinates.x;
		this.y = coordinates.y;
		return this;
	}
}

export default Coordinates;