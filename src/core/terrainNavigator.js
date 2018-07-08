//@flow

import Navigator from './navigator';
import Terrain from '../render/terrain';
import Grid from './grid';

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
	 * @returns {Array}
	 * @abstract
	 */
	getNavigation(destinationInfo: {current: Grid, destination: Grid}): Array<Grid> {
		return [];
	}
}

export default TerrainNavigator;