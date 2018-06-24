//@flow
import Terrain from '../render/terrain';

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
}

export default Navigator;