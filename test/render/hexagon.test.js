import expect from 'expect.js';
import Hexagon from '../../src/render/hexagon';
import TerrainChain, {COS_30_DEGREES} from '../../src/chain/terrainChain';
import Coordinates from '../../src/core/coordinates';

describe('Hexagon', () => {
	let hexagon,
		height = 70,
		width = 80;
	
	beforeEach(() => {
		TerrainChain.setHexagonSize({height, width});
		hexagon = new Hexagon({
			gridCoordinates: new Coordinates(0,0),
			terrain: {},
			position:  new Coordinates(0,0),
		});
	});
	
	afterEach(() => {
		hexagon = null;
	});
	
	it('render position should be correctly', () => {
		
		hexagon.setPositionOnTerrain(new Coordinates(1,1));
		
		expect(hexagon.getPosition().x).to.be((width / 2) + (height * COS_30_DEGREES ));
		expect(hexagon.getPosition().y).to.be(height + (height / 2) * (1 + 1 % 2));
	});
	
});