import StageAgent from './stageAgent';
import Controller from '../control/controller';

export default class LOMSRenderer {
    
    constructor(props) {
        this._onAssetLoadingFinish = () => {};
        this._controller = new Controller();
        this.initRenderer();
        this.initAssetLoader();
    }

    initRenderer() {

        this._renderer = new PIXI.Application(1000, 725, { backgroundColor: 0xeeeeee });

        this._stageAgent = new StageAgent({ renderer: this._renderer, controller: this._controller });

        this._stageAgent.init();

        document.body.appendChild(this._renderer.view);

        return this;
    }

    initAssetLoader(){
        let loader = PIXI.loader;
        loader.onProgress.add((e) => {
            console.log(e.progress);
        });

        loader.onComplete.add((loader, resources) => {
            this._resources = resources;
            this._onAssetLoadingFinish();
        });
    }

    _setAssetLoadingListener(onFinish){
        this._onAssetLoadingFinish = onFinish;
    }

    _prepareAssets(assetsData) {
        let loader = PIXI.loader;
        loader.reset();

        for (let asset in assetsData) {
            if (assetsData[asset].IS_CHARACTER) {
                for (let animation in assetsData[asset].DATA) {
                    loader.add(assetsData[asset].DATA[animation].NAME, assetsData[asset].DATA[animation].PATH);
                }
            }
            else {
                loader.add(assetsData[asset].DATA.NAME, assetsData[asset].DATA.PATH);
            }
        }

        loader.load();
    }

    renderScene(scene) {
        scene.setRenderer(this);
        this._setAssetLoadingListener( scene.onAssetsFinish());
        this._prepareAssets(scene.getAssetsDate());
    }

    getController() {
        return this._controller;
    }

    addActor(actor) {

        if (!actor.isNoAsset()) {
            actor.initResources(this._resources);
        }
        this._stageAgent.addActor(actor);
    }

    clearStage(){
        this._stageAgent.clearActors();
    }

    render() {
        this._renderer.ticker.add((delta) => {
            this._stageAgent.render(delta);
        });
    }
}