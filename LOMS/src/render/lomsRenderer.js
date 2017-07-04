import S_assetData from '../static/assetData';
import StageAgent from './stageAgent';

export default class LOMSRenderer {

    /**
     * init assets and renderer
     * @param {*callback} onFinish will be triggered if init is finished
     */
    init(onFinish){
        this.initRenderer();
        this.initAssets(onFinish);
    }

    initRenderer() {

        this._renderer = new PIXI.Application(990, 768, { backgroundColor: 0xeeeeee });

        this._stageAgent = new StageAgent(this._renderer);

        this._isAssetsLoadingDone = false;

        document.body.appendChild(this._renderer.view);
    }

    initAssets(onFinish){

        let loader = PIXI.loader;
        for(let asset in S_assetData){
            loader.add(S_assetData[asset].NAME,S_assetData[asset].PATH);
        }

        loader.load((loader, resources)=>{
            this._resources = resources;
            onFinish();
        });
    }

    addActor(actor){
        actor.initResources(this._resources);
        this._stageAgent.addActor(actor);
    }

    render() {
        this._renderer.ticker.add((delta) => {
            this._stageAgent.render(delta);
        });
    }
}