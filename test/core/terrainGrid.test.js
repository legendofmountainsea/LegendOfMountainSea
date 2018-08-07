import expect from 'expect.js';
import TerrainGrid from '../../src/core/navigation/terrainGrid';
import Coordinates from '../../src/core/coordinates';

describe("TerrainGrid", () => {
    let terrainGrid;

    beforeEach(() => {
        terrainGrid = new TerrainGrid();
    });

    afterEach(() => {
        terrainGrid = null;
    });

    // it("should be able to return correct number of grid by radius", () => {
    //     const radius = 2,
    //         originalPoint = {x: 2, y:3},
    //         blocks = terrainGrid.getData(originalPoint, {radius:radius});
    //
    //     expect(blocks).to.eql([
    //         [new Coordinates(1,1),new Coordinates(2,1),new Coordinates(3,1),new Coordinates(4,1),new Coordinates(5,1)],
    //         [new Coordinates(1,2),new Coordinates(2,2),new Coordinates(3,2),new Coordinates(4,2),new Coordinates(5,2)],
    //         [new Coordinates(0,3),new Coordinates(1,3),new Coordinates(2,3),new Coordinates(3,3),new Coordinates(4,3)],
    //         [new Coordinates(0,4),new Coordinates(1,4),new Coordinates(2,4),new Coordinates(3,4),new Coordinates(4,4)],
    //         [new Coordinates(-1,5),new Coordinates(0,5),new Coordinates(1,5),new Coordinates(2,5),new Coordinates(3,5)],
    //     ]);
    // });

});
