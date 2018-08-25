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
		//this._toward = null;
	}

	setFrom(point: PathNode): void {
		this._from = point;
	}

	// setToward(point: PathNode): void {
	// 	this._toward = point;
	// }

	getStep(): number{
		return this._step;
	}

	getNeighbors(): Array<PathNode> {
		const neighbor: Array<Grid> = this.getLocation().getNeighbors();
		const startNode: PathNode = new PathNode({point: this.getLocation(), step: this.getStep(), destination: this.getDestination(), from: null});
		const pathNodes: Array<PathNode> = [];

		for (const grid of neighbor) {
			const pathNode = new PathNode({point: grid, step: this.getStep() + 1, destination: this.getDestination(), from: startNode});
			pathNodes.push(pathNode);
		}

		return pathNodes;
	}

	getLocation(): Grid{
		return this._point;
	}

	getDestination(): Grid{
		return this._destination;
	}

	getWeight(): number{
		return this.getLocation().distanceTo(this.getDestination()) + this.getStep();
	}
}

export default PathNode;