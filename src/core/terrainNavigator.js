//@flow

import Navigator from './navigator';
import Terrain from '../render/terrain';

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
}

export default TerrainNavigator;