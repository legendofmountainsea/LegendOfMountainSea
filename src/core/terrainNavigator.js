//@flow

import type NavigatorType from './navigator';
import Navigator from './navigator';

type TerrainNavigatorType = {
	...NavigatorType,
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
    constructor(props: TerrainNavigatorType) {
        super(props);
    }
}

export default TerrainNavigator;