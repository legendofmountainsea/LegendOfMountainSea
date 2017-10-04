import Grid from './grid';
import Coordinates from './coordinates';

export default class TerrainGrid extends Grid {
    constructor(props){
        super(props);
    }

    getData(center, range){

        const length = range.radius * 2 + 1,
            coordinatesSet = [];

        for ( let index = 0; index < length; ++index){
            let blockRow = [];
            for (let columnIndex = 0; columnIndex < length; ++columnIndex){
                let coordinatesX = center.x - (range.radius - 1) - Math.floor(index/2) + columnIndex,
                    coordinatesY = center.y - range.radius + index;
                blockRow.push(new Coordinates(coordinatesX,coordinatesY));
            }
            coordinatesSet.push(blockRow);
        }

        return coordinatesSet;
    }
}