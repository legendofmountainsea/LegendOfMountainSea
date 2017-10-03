import Grid from './grid';
import Coordinates from './coordinates';

export default class TerrainGrid extends Grid {
    constructor(props){
        super(props);
    }

    getData(center, range){
        return [
            [new Coordinates(1,1),new Coordinates(2,1),new Coordinates(3,1),new Coordinates(4,1),new Coordinates(5,1)],
            [new Coordinates(1,2),new Coordinates(2,2),new Coordinates(3,2),new Coordinates(4,2),new Coordinates(5,2)],
            [new Coordinates(0,3),new Coordinates(1,3),new Coordinates(2,3),new Coordinates(3,3),new Coordinates(4,3)],
            [new Coordinates(0,4),new Coordinates(1,4),new Coordinates(2,4),new Coordinates(3,4),new Coordinates(4,4)],
            [new Coordinates(-1,5),new Coordinates(0,5),new Coordinates(1,5),new Coordinates(2,5),new Coordinates(3,5)],
        ];
    }
}