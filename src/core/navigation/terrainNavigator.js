//@flow

import Navigator from './navigator';
import Terrain from '../../render/terrain';
import Grid from './grid';
import PathNode from './pathNode';

type TerrainNavigatorPropsType = {
	terrain: Terrain
};

/**
 * class of a terrain navigator which provide navigation router
 * @extends Navigator
 */
class TerrainNavigator extends Navigator {
	/**
	 * create a terrain navigator
	 * @param props {Object}
	 */
	constructor(props: TerrainNavigatorPropsType) {
		super(props);
	}

	/**
	 * get navigation from here(current) to here(destination)
	 * @param destinationInfo {Object}
	 * @param destinationInfo.current {TerrainGrid} start point of the grid
	 * @param destinationInfo.destination {TerrainGrid} destination point of the grid
	 * @returns {Array}
	 * @abstract
	 */
	getNavigation(destinationInfo: {current: Grid, destination: Grid}): Array<Grid> {

		const {current, destination} = destinationInfo;
		const neighbor: Array<Grid> = current.getNeighbor();
		const pathNodes: Array<PathNode> = [];
		const startNode: PathNode = new PathNode({point:current, step:0, destination: destination, from: null});

		for(const grid of neighbor){

			const pathNode = new PathNode({point: grid, step: 1, destination: destination, from: startNode});
			pathNodes.push(pathNode);
		}

		this.getCorrectPath(pathNodes);

		return [];
	}

	getCorrectPath(pathNodes: Array<PathNode>): Array<Grid> {

		return [];
	}
}

export default TerrainNavigator;