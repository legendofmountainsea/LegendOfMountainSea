import S_assetData from '../static/assetData';
import StageAgent from './stageAgent';

export default class LOMSRenderer {

    /**
     * init assets and renderer
     * @param {*callback} onFinish will be triggered if init is finished
     */
    init(onFinish) {
        this.initRenderer();
        this.initAssets(onFinish);
    }

    initRenderer() {

        this._renderer = new PIXI.Application(990, 768, { backgroundColor: 0xeeeeee });

        this._stageAgent = new StageAgent(this._renderer);

        this._stageAgent.initController();

        document.body.appendChild(this._renderer.view);
    }

    initAssets(onFinish) {

        let loader = PIXI.loader;

        for (let asset in S_assetData) {
            if (S_assetData[asset].IS_CHARACTER) {
                for (let animation in S_assetData[asset].DATA) {
                    loader.add(S_assetData[asset].DATA[animation].NAME, S_assetData[asset].DATA[animation].PATH);
                }
            }
            else {
                loader.add(S_assetData[asset].DATA.NAME, S_assetData[asset].DATA.PATH);
            }
        }

        loader.onProgress.add((e) => {
            console.log(e.progress);
        });

        loader.onComplete.add((loader, resources) => {
            this._resources = resources;
            onFinish();
        });

        loader.load();
    }

    getController(){
        return this._stageAgent.getController();
    }

    addActor(actor) {
        actor.initResources(this._resources);
        this._stageAgent.addActor(actor);
    }

    render() {
        this._renderer.ticker.add((delta) => {
            this._stageAgent.render(delta);
        });
    }
}