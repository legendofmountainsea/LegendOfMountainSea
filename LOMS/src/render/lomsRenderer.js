import S_assetData from '../static/assetData';
import StageAgent from './stageAgent';

export default class LOMSRenderer {

    /**
     * init assets and renderer
     * @param {*callback} onFinish will be triggered if init is finished
     */
    init(props) {
        this._onFinish = props.onFinish;
        this._controller = props.controller;
        this.initRenderer();
        this.initAssets();
    }

    initRenderer() {

        this._renderer = new PIXI.Application(970, 755, { backgroundColor: 0xeeeeee });

        this._stageAgent = new StageAgent({renderer:this._renderer,controller:this._controller});

        this._stageAgent.init();

        document.body.appendChild(this._renderer.view);
    }

    initAssets() {

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
            this._onFinish();
        });

        loader.load();
    }

    getController(){
        return this._controller;
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