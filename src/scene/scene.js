// @flow

import type { AnimationAssetType } from '../static/type/assetDataType';
import type LOMSRenderer from '../render/lomsRenderer';

type ScenePropsType = {
};

/**
 * class for every scene which renderer could render
 */
class Scene {

	_props: Object;
	_renderer: LOMSRenderer;
	_assetsData: Array<AnimationAssetType>;
	_onFinish: Function;

    constructor(props: ScenePropsType) {
        this._props = props;
        this._assetsData = [];
        this._onFinish = () => {};
    }

    setRenderer(renderer: LOMSRenderer){
        this._renderer = renderer;
    }

    getAssetsDate() {
        return this._assetsData;
    }

    onAssetsFinish() {
        return this._onFinish;
    }
}

 export default Scene;