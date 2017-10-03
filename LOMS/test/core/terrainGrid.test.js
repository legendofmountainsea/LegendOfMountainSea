import expect from 'expect.js';
import TerrainGrid from '../../src/core/terrainGrid';

describe("TerrainGrid", () => {
    let terrainGrid;

    beforeEach(() => {
        terrainGrid = new TerrainGrid();
    });

    afterEach(() => {
        terrainGrid = null;
    });

    it("should be able to return correct number of grid by radius", () => {
        const radius = 2,
            originalPoint = {x: 2, y:3},
            grids = terrainGrid.getData(originalPoint, {radius:radius});

        for ( let index = 0; index < grids.length; ++index){
            for (let columnIndex = 0; columnIndex <grids[index].length; ++columnIndex){
                let coordinates = grids[index][columnIndex];
                expect(coordinates.x).to.be(originalPoint.x - (radius - 1) - Math.floor(index/2) + columnIndex);
                expect(coordinates.y).to.be(originalPoint.y - radius + index);
            }

        }
    });

});
