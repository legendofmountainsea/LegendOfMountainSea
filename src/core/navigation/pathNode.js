//@flow
import Grid from './grid';

type PathNodePropsType = {
	point: Grid
};

/**
 * a class for managing path in a star navigation algorithm
 */
class PathNode {
	_from: PathNode | null;
	_toward: PathNode | null;
	_point: Grid;

	/**
	 * create a path node
	 * @param props {object}
	 * @param props.point {Grid} current position in path
	 */
	constructor(props: PathNodePropsType){
		this._point = props.point;
		this._from = null;
		this._toward = null;
	}


}

export default PathNode;