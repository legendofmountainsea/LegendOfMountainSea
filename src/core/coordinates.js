export default class Coordinates {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	set(coordinates) {
		this.x = coordinates.x;
		this.y = coordinates.y;
	}
}