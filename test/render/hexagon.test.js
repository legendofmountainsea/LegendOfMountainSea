import expect from 'expect.js';
import Hexagon from '../../src/render/hexagon';

const COS_30_DEGREES = Math.cos(Math.PI / 6);
describe('Hexagon', () => {
	let hexagon,
		height = 70,
		width = 80;
	
	beforeEach(() => {
		hexagon = new Hexagon({position: {x: 0, y: 0}});
	});
	
	afterEach(() => {
		hexagon = null;
	});
	
	it('render position should be correctly', () => {
		
		hexagon.setDimensions({
			height,
			width,
		}).setPositionOnTerrain({
			x: 1,
			y: 1,
		});
		
		expect(hexagon.getPosition().x).to.be((width / 2) + (height * COS_30_DEGREES ));
		expect(hexagon.getPosition().y).to.be(height + (height / 2) * (1 + 1 % 2));
	});
	
});