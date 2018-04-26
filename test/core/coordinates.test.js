import expect from 'expect.js';
import Coordinates from '../../src/core/coordinates';

describe('Coordinates', () => {
	let coordinates = null;
	beforeEach(() => {
		coordinates = new Coordinates(0, 0);
	});
	
	afterEach(() => {
		coordinates = null;
	});
	
	it('coordinates should be 0,0', () => {
		expect(coordinates.x).to.be(0);
		expect(coordinates.y).to.be(0);
	});
	
	it('coordinates should be 1,2', () => {
		expect(coordinates.x).to.be(0);
		expect(coordinates.y).to.be(0);
		
		coordinates.set({x:1,y:2});
		
		expect(coordinates.x).to.be(1);
		expect(coordinates.y).to.be(2);
	});
});