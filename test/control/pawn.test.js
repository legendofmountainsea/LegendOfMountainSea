import expect from 'expect.js';
import Pawn from '../../src/control/pawn';
import Character from '../../src/render/character';
import Coordinates from '../../src/core/coordinates';

describe('Pawn', () => {
	let pawn;

	beforeEach(() => {
		pawn = new Pawn({
			character: new Character({
				assetData: null,
				noAsset: true,
				position: new Coordinates(0, 0),
			}),
		});
	});

	afterEach(() => {
		pawn = null;
	});

	it(`character's destination should be null`, () => {

		// const gridCoordinates = new Coordinates(5,6);
		//
		// const hexagon = new Hexagon({
		// 	gridCoordinates: gridCoordinates,
		// 	terrain: {},
		// 	position:  pawn.getCharacter()._convertGridPositionToTerrain(gridCoordinates),
		// });
		//
		// pawn.onMouseClick(hexagon);
		//
		const character = pawn.getCharacter();
		expect(character.getDestination()).to.be(null);
	});

});
