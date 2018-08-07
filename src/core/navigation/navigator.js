//@flow
import Terrain from '../../render/terrain';
import Grid from './grid';

export type NavigatorPropsType = {
	terrain: Terrain
};

/**
 * class of a navigator which provide navigation router
 */
class Navigator {

	_terrain: Terrain;

	/**
	 * create a navigator
	 * @param props {Object}
	 */
	constructor(props: NavigatorPropsType) {
		this._terrain = props.terrain;
	}

	/**
	 * get navigation from here(current) to here(destination)
	 * @param destinationInfo
	 * @returns {Array}
	 * @abstract
	 */
    getNavigation(destinationInfo: {current: Grid, destination: Grid}): Array<Grid> {
		return [];
    }
}

export default Navigator;