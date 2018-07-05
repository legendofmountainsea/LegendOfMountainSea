//@flow

import Navigator from './navigator';
import Terrain from '../render/terrain';
import Hexagon from '../render/hexagon';

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

	getNavigation(destinationInfo: { current:Hexagon, destination: Hexagon }) {

	}
}

export default TerrainNavigator;