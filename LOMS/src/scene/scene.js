export default class Scene {
    constructor(props) {
        this.props = props;
        this._renderer = null;
        this._assetsData = {};
        this._onFinish = () => {};
    }
    
    setRenderer(renderer){
        this._renderer = renderer;
    }

    getAssetsDate() {
        return this._assetsData;
    }

    onAssetsFinish(onFinish) {
        return this._onFinish;
    }
}