import expect from 'expect.js';
import Cube from '../../../src/core/navigation/cube';

describe('Cube', () => {
    let cube = null;
    beforeEach(() => {
        cube = new Cube(1, 9, 3);
    });

    afterEach(() => {
        cube = null;
    });

    it('convertToGridCoordinates should be Coordinates 1,3', () => {
        let coordinates = cube.convertToGridCoordinates();
        expect(coordinates.x).to.be(1);
        expect(coordinates.y).to.be(3);
    });

	it('distanceTo should be correct', () => {
		let distance = cube.distanceTo(new Cube(0, 0, 0));
		expect(distance).to.be(9);

		distance = cube.distanceTo(new Cube(1, 2, 3));
		expect(distance).to.be(7);
	});
});
