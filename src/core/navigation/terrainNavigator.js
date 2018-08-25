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
	getNavigation(destinationInfo: { current: Grid, destination: Grid }): Array<Grid> {

		const {current, destination} = destinationInfo;
		const startNode: PathNode = new PathNode({point: current, step: 0, destination: destination, from: null});

		this.getCorrectPath(startNode.getNeighbors());

		return [];
	}

	getCorrectPath(pathNodes: Array<PathNode>): Array<Grid> {

		//init
		const weights: Array<number> = [];
		const openPathMap: {[number | typeof undefined]: Array<PathNode>} = {};

		for (const path of pathNodes) {
			const weight = path.getWeight();
			weights.push(weight);
			if (openPathMap[weight] === null) {
				openPathMap[weight] = [];
			}

			openPathMap[weight].push(path);
		}

		weights.sort((a, b) => (a - b));

		const weightSet: Set<number> = new Set();

		for (const weight of weights) {
			weightSet.add(weight);
		}

		//scanPath
		let currentWeight = weightSet.values().next().value;
		let openPathsWithWeight: Array<PathNode> | typeof undefined = openPathMap[currentWeight];
		if(openPathsWithWeight){
			openPathsWithWeight.sort((a: PathNode, b: PathNode) => (a.getStep() - b.getStep()));
		}

		return [];
	}
}

export default TerrainNavigator;