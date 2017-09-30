import expect from 'expect.js';
import Pawn from '../../src/control/pawn';
import Character from '../../src/render/character';

describe("Pawn", function () {
    let pawn;

    beforeEach(function () {
        pawn = new Pawn({character: new Character({noAsset: true, position: {x: 0, y: 0}})});
    });

    it("should be able to set destination", function () {
        const mouseEvent = {data: {originalEvent: {layerX: 5, layerY: 6}}};
        pawn.onMouseDown(mouseEvent);

        const character = pawn.getCharacter();
        expect(character.getDestination().x).to.be(5);
        expect(character.getDestination().y).to.be(6);
    });

});
