import S_assetData from '../static/assetData';
import StageAgent from './stageAgent';
import Controller from '../control/controller';
import { prepare } from 'pixi.js';

export default class LOMSRenderer {
    
    constructor(props) {
        this._onFinish = () => {};
        this._controller = new Controller();
        this.initRenderer();
    }

    initRenderer() {

        this._renderer = new PIXI.Application(970, 755, { backgroundColor: 0xeeeeee });

        this._stageAgent = new StageAgent({ renderer: this._renderer, controller: this._controller });

        this._stageAgent.init();

        document.body.appendChild(this._renderer.view);
    }

    _prepareAssets(assetsData, onFinish) {
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

        loader.onProgress.add((e) => {
            console.log(e.progress);
        });

        loader.onComplete.add((loader, resources) => {
            this._resources = resources;
            onFinish();
        });

        loader.load();
    }

    renderScene(scene) {
        scene.setRenderer(this);
        this._prepareAssets(scene.getAssetsDate(), scene.onAssetsFinish());
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

    addUIText(uiText) {
        this._stageAgent.addUIText(uiText);
    }

    render() {
        this._renderer.ticker.add((delta) => {
            this._stageAgent.render(delta);
        });
    }
}