//@flow
import Grid from './grid';

type PathNodePropsType = {
	point: Grid,
	step: number,
	destination: Grid,
	from: PathNode | null,
};

/**
 * a class for managing path in a star navigation algorithm
 */
class PathNode {
	_from: PathNode | null;
	_toward: PathNode | null;
	_destination: Grid;
	_point: Grid;
	_step: number;

	/**
	 * create a path node
	 * @param props {object}
	 * @param props.point {Grid} current position in path
	 */
	constructor(props: PathNodePropsType){
		this._point = props.point;
		this._step = props.step;
		this._destination = props.destination;
		this._from = props.from;
		this._toward = null;
	}

	setFrom(point: PathNode): void {
		this._from = point;
	}

	setToward(point: PathNode): void {
		this._toward = point;
	}


}

export default PathNode;