import Mouse from './mouse';
import StageAgent from './stageAgent';
import Controller from '../control/controller';
import Window from '../module/window';

export default class LOMSRenderer {
	
	constructor(props) {
		this._controller = null;
		this._onAssetLoadingFinish = () => {
		};
		this.initRenderer();
		this.initAssetLoader();
	}
	
	initRenderer() {
		
		const {width, height} = Window.getDimension();
		
		this._renderer = new PIXI.Application(width, height, {backgroundColor: 0xeeeeee});
		
		this._controller = new Controller({
			mouse: new Mouse({
				hitArea: new PIXI.Rectangle(0, 0, width, height),
			}).init(),
		});
		
		this._stageAgent = new StageAgent({renderer: this._renderer, controller: this._controller});
		
		this._stageAgent.init();
		
		document.getElementById('CanvasContainer').appendChild(this._renderer.view);
		
		this._renderer.view.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			//TODO: left mouse click feature
		});
		
		return this;
	}
	
	initAssetLoader() {
		let loader = PIXI.loader;
		loader.onProgress.add((e) => {
			//console.log(e.progress);
		});
		
		loader.onComplete.add((loader, resources) => {
			this._resources = resources;
			this._onAssetLoadingFinish();
		});
	}
	
	_setAssetLoadingListener(onFinish) {
		this._onAssetLoadingFinish = onFinish;
	}
	
	_prepareAssets(assetsSet) {
		let loader = PIXI.loader;
		loader.reset();
		
		for (let assetsData of assetsSet) {
			
			for (let asset in assetsData) {
				if (assetsData[asset].IS_CONTAIN_ANIMATION) {
					for (let animation in assetsData[asset].DATA) {
						loader.add(assetsData[asset].DATA[animation].NAME, assetsData[asset].DATA[animation].PATH);
					}
				}
				else {
					loader.add(assetsData[asset].DATA.NAME, assetsData[asset].DATA.PATH);
				}
			}
		}
		
		loader.load();
	}
	
	renderScene(scene) {
		scene.setRenderer(this);
		this._setAssetLoadingListener(scene.onAssetsFinish());
		this._prepareAssets(scene.getAssetsDate());
	}
	
	getController() {
		return this._controller;
	}
	
	addTerrain(terrain) {
		if (!terrain.isNoAsset()) {
			terrain.initResources(this._resources);
		}
		this._stageAgent.addTerrain(terrain);
	}
	
	addUI(ui){
		if(!ui.isNoAsset()){
			ui.initResources(this._resources);
		}
		this._stageAgent.addUI(ui);
	}
	
	addActor(actor) {
		
		if (!actor.isNoAsset()) {
			actor.initResources(this._resources);
		}
		this._stageAgent.addActor(actor);
	}
	
	clearStage() {
		this._stageAgent.clearUI();
		this._stageAgent.clearActors();
	}
	
	close() {
		Window.close();
	}
	
	render() {
		this._renderer.ticker.add((delta) => {
			this._stageAgent.render(delta);
		});
	}
}