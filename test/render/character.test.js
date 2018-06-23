import expect from 'expect.js';
import Character from '../../src/render/character';
import Coordinates from '../../src/core/coordinates';

describe('Character', () => {
    let character,
        DIRECTION_LEFT = -1,
        initPosition = new Coordinates(5,5);

    beforeEach(() => {
        character = new Character({
	        assetData: null,
            noAsset: true,
            position: new Coordinates(5,5),
        });

        character.setElement({
            position: new Coordinates(5,5),
            scale: {x: 1, y: 1},
        });
    });

    afterEach(() => {
        character = null;
    });

    it('Moving direction should be changed', () => {
        character.moveTo(new Coordinates(0,0));

        character.movingOnAxisXToDestination(1);
        expect(character.getDirection()).to.be(DIRECTION_LEFT);
    });

    it('Moving direction should not be changed', () => {
        character.moveTo(new Coordinates(6,6));

        character.movingOnAxisXToDestination(1);
        expect(character.getDirection()).to.not.be(DIRECTION_LEFT);
    });

    it('Moving distance on axis X should be -2 in low render mode', () => {
        character.moveTo(new Coordinates(0,0));
        const deltaX = character.movingOnAxisXToDestination(2);
        expect(deltaX).to.be(initPosition.x - 2);
    });

    it('Moving distance on axis Y should be -2 in low render mode', () => {
        character.moveTo(new Coordinates(0,0));

        const deltaY = character.movingOnAxisYToDestination(2);
        expect(deltaY).to.be(initPosition.y - 2);
    });

    it('Moving distance on axis X should be 2 in low render mode', () => {
        character.moveTo(new Coordinates(10,10));

        const deltaX = character.movingOnAxisXToDestination(2);
        expect(deltaX).to.be(initPosition.x + 2);
    });

    it('Moving distance on axis Y should be 2 in low render mode', () => {
        character.moveTo(new Coordinates(10,10));

        const deltaY = character.movingOnAxisYToDestination(2);
        expect(deltaY).to.be(initPosition.y + 2);
    });

});