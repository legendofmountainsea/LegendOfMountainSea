import expect from 'expect.js';
import TerrainGrid from '../../../src/core/navigation/terrainGrid';
import Coordinates from '../../../src/core/coordinates';

describe('TerrainGrid', () => {
	let terrainGrid;

	beforeEach(() => {
		terrainGrid = new TerrainGrid({ point: new Coordinates(1, 2) });
	});

	afterEach(() => {
		terrainGrid = null;
	});

	it('should be able to return correct neighbors', () => {
		let neighbors = terrainGrid.getNeighborsPoints(true);

		expect(neighbors).to.eql([
			new Coordinates(2, 3),
			new Coordinates(2, 2),
			new Coordinates(1, 1),
			new Coordinates(0, 2),
			new Coordinates(0, 3),
			new Coordinates(1, 3),
		]);

		const terrainGrid2 = new TerrainGrid({ point: new Coordinates(2, 3) });

		neighbors = terrainGrid2.getNeighborsPoints(true);

		expect(neighbors).to.eql([
			new Coordinates(3, 3),
			new Coordinates(3, 2),
			new Coordinates(2, 2),
			new Coordinates(1, 2),
			new Coordinates(1, 3),
			new Coordinates(2, 4),
		]);
	});
});
