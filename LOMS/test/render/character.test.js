import expect from 'expect.js';
import Character from '../../src/render/character';

describe('Character', () => {
    let character,
        DIRECTION_LEFT = -1,
        initPosition = {x: 5, y: 5};

    beforeEach(() => {
        character = new Character({
            noAsset: true,
            position: {x: 5, y: 5},
        });

        character.setSprite({
            position: {x: 5, y: 5},
            scale: {x: 1, y: 1},
        });
    });

    afterEach(() => {
        character = null;
    });

    it('Moving direction should be changed', () => {
        character.moveTo({
            x:0, y:0,
        });

        character.movingOnAxisXToDestination(1);
        expect(character.getDirection()).to.be(DIRECTION_LEFT);
    });

    it('Moving direction should not be changed', () => {
        character.moveTo({
            x:6, y:6,
        });

        character.movingOnAxisXToDestination(1);
        expect(character.getDirection()).to.not.be(DIRECTION_LEFT);
    });

    it('Moving distance on axis X should be -2 in low render mode', () => {
        character.moveTo({
            x:0, y:0,
        });
        const deltaX = character.movingOnAxisXToDestination(2);
        expect(deltaX).to.be(initPosition.x - 2);
    });

    it('Moving distance on axis Y should be -2 in low render mode', () => {
        character.moveTo({
            x:0, y:0,
        });

        const deltaY = character.movingOnAxisYToDestination(2);
        expect(deltaY).to.be(initPosition.y - 2);
    });

    it('Moving distance on axis X should be 2 in low render mode', () => {
        character.moveTo({
            x:10, y:10,
        });

        const deltaX = character.movingOnAxisXToDestination(2);
        expect(deltaX).to.be(initPosition.x + 2);
    });

    it('Moving distance on axis Y should be 2 in low render mode', () => {
        character.moveTo({
            x:10, y:10,
        });

        const deltaY = character.movingOnAxisYToDestination(2);
        expect(deltaY).to.be(initPosition.y + 2);
    });

});