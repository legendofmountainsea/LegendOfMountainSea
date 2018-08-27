//@flow
import type Grid from './grid';

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
	_destination: Grid;
	_point: Grid;
	_step: number;

	/**
	 * create a path node
	 * @param props {object}
	 * @param props.point {Grid} current position in path
	 * @param props.step {number} current step
	 * @param props.destination {Grid} destination where player wants to be
	 * @param props.from {Grid} where this path connect with, if null this path is a start point
	 */
	constructor(props: PathNodePropsType){
		this._point = props.point;
		this._step = props.step;
		this._destination = props.destination;
		this._from = props.from;
	}

	/**
	 * set where this path connect with
	 * @param point {PathNode}
	 */
	setFrom(point: PathNode): void {
		this._from = point;
	}

	/**
	 * get where this path connect with
	 * @returns {PathNode}
	 */
	getFrom(): PathNode | null {
		return this._from;
	}

	/**
	 * get current step
	 * @returns {number}
	 */
	getStep(): number{
		return this._step;
	}

	/**
	 * get neighbors pathNode according to this path's grid location
	 * @returns {Array<PathNode>}
	 */
	getNeighbors(): Array<PathNode> {
		const neighbor: Array<Grid> = this.getLocation().getNeighbors();
		const startNode: PathNode = new PathNode({point: this.getLocation(), step: this.getStep(), destination: this.getDestination(), from: this.getFrom()});
		const pathNodes: Array<PathNode> = [];

		for (const grid of neighbor) {
			const pathNode = new PathNode({point: grid, step: this.getStep() + 1, destination: this.getDestination(), from: startNode});
			pathNodes.push(pathNode);
		}

		return pathNodes;
	}

	/**
	 * get this path's grid location
	 * @returns {Grid}
	 */
	getLocation(): Grid{
		return this._point;
	}

	/**
	 * get destination where player wants to be
	 * @returns {Grid}
	 */
	getDestination(): Grid{
		return this._destination;
	}

	isAtDestination(){
		const endPoint = this.getDestination().getPoint();
		const currentPoint = this.getLocation().getPoint();
		return endPoint.x === currentPoint.x && endPoint.y === currentPoint.y;
	}

	/**
	 * get navigation weight on this path
	 * @returns {number}
	 */
	getWeight(): number{
		return this.getLocation().distanceTo(this.getDestination()) + this.getStep();
	}
}

export default PathNode;