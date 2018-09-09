//@flow

import type Terrain from '../../render/terrain';
import Grid from './grid';
import PathNode from './pathNode';
import Navigator from './navigator';

type TerrainNavigatorPropsType = {
	terrain: Terrain,
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
	 * @returns {Array<Grid>} array of Grid
	 * @abstract
	 */
	getNavigation(destinationInfo: {
		current: Grid,
		destination: Grid,
	}): Array<Grid> {
		const { current, destination } = destinationInfo;
		const startNode: PathNode = new PathNode({
			point: current,
			step: 0,
			destination: destination,
			from: null,
		});

		if (startNode.isAtDestination()) {
			return [];
		}

		return this.getCorrectPath(startNode);
	}

	/**
	 * get an array of grid that should navigate a correct path, return empty array if there is no correct path
	 * @param startNode {PathNode} array of PathNode
	 * @returns {Array<Grid>} array of Grid
	 */
	getCorrectPath(startNode: PathNode): Array<Grid> {
		const pathNodes = startNode.getNeighbors();
		const scannedPaths: Array<PathNode> = [startNode];
		const correctPath = [];

		let openPaths: Array<PathNode> = pathNodes;
		let correctNode: PathNode | null = null;
		let shouldScan: boolean = !(correctNode || !openPaths.length);

		while (shouldScan) {
			const {
				node,
				closedPaths,
				newOpenPaths,
			} = TerrainNavigator.getCorrectNode(openPaths);

			correctNode = node;

			scannedPaths.push(...closedPaths);

			openPaths = this.excludeScannedPath(openPaths, scannedPaths);

			openPaths.push(...newOpenPaths);

			shouldScan = !( correctNode || !openPaths.length || openPaths.length > 50);
		}

		if (correctNode) {
			let lastNode: PathNode | null = correctNode.getFrom();
			correctPath.unshift(correctNode.getLocation());

			while (lastNode && lastNode.getFrom()) {
				correctPath.unshift(lastNode.getLocation());
				lastNode = lastNode.getFrom();
			}
		}

		return correctPath;
	}

	excludeScannedPath(
		openPaths: Array<PathNode>,
		scannedPaths: Array<PathNode>,
	): Array<PathNode> {
		const result: Array<PathNode> = [];

		for (const openPath of openPaths) {
			const shouldBeExcluded = scannedPaths.find((path) => {
				return openPath.getLocation() === path.getLocation();
			});

			if (shouldBeExcluded) {
				continue;
			}

			result.push(openPath);
		}

		return result;
	}

	static getCorrectNode(
		paths: Array<PathNode>,
	): {
		node: PathNode | null,
		closedPaths: Array<PathNode>,
		newOpenPaths: Array<PathNode>,
	} {
		let node = null;

		const pathsMatchWeight: Array<PathNode> = [];
		const smallestWeight = TerrainNavigator.getSmallestWeight(paths);
		const priorityPathsByStep: Array<PathNode> = [];

		const closedPaths = [];
		const newOpenPaths = [];

		for (const path of paths) {
			if (path.getWeight() === smallestWeight) {
				pathsMatchWeight.push(path);
			}
		}

		pathsMatchWeight.sort((a, b) => a.getStep() - b.getStep());

		const priorityStepNumber = pathsMatchWeight[0].getStep();

		for (const path of pathsMatchWeight) {
			if (path.getStep() !== priorityStepNumber) {
				break;
			}

			priorityPathsByStep.push(path);
		}

		for (const path of priorityPathsByStep) {
			if (path.isAtDestination()) {
				node = path;
				break;
			}

			closedPaths.push(path);
			newOpenPaths.push(...path.getNeighbors());
		}

		return { node, closedPaths, newOpenPaths };
	}

	static getSmallestWeight(paths: Array<PathNode>): number {
		const weights = [];
		for (const path of paths) {
			weights.push(path.getWeight());
		}

		weights.sort((a, b) => a - b);

		return weights[0];
	}
}

export default TerrainNavigator;
