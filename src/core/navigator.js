//@flow
import Terrain from '../render/terrain';

export type NavigatorType = {
	terrain: Terrain
};

/**
 * class of a navigator which provide navigation router
 */
class Navigator {
	/**
	 * create a navigator
	 * @param props {Object}
	 */
	constructor(props: NavigatorType) {
		this._terrain = props.terrain;
	}
}

export default Navigator;