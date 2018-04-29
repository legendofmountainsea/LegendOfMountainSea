import Mouse from './mouse';
import StageAgent from './stageAgent';
import Controller from '../control/controller';
import Window from '../module/window';

/**
 * class for renderer
 */
class LOMSRenderer {
	
	/**
	 * init renderer for game
	 * @param props
	 */
	constructor(props) {
		this._controller = null;
		this._onAssetLoadingFinish = () => {
		};
		this.initRenderer();
		this.initAssetLoader();
	}
	
	/**
	 * init renderer and stage
	 * @todo left mouse click feature
	 * @returns {LOMSRenderer}
	 */
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
		});
		
		return this;
	}
	
	/**
	 * init asset loader for loading asset files
	 * @returns {LOMSRenderer}
	 * @todo show progress information
	 */
	initAssetLoader() {
		let loader = PIXI.loader;
		loader.onProgress.add((e) => {
			//console.log(e.progress);
		});
		
		loader.onComplete.add((loader, resources) => {
			this._resources = resources;
			this._onAssetLoadingFinish();
		});
		
		return this;
	}
	
	_setAssetLoadingListener(onFinish) {
		this._onAssetLoadingFinish = onFinish;
	}
	
	/**
	 * loading asset files to memory
	 * @param assetsSet {object} static object contain files information such as path, name etc.
	 * @returns {LOMSRenderer}
	 * @private
	 */
	_prepareAssets(assetsSet) {
		let loader = PIXI.loader;
		loader.reset();
		
		for (let assetsData of assetsSet) {
			
			for (const asset in assetsData) {
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
		
		return this;
	}
	
	/**
	 * switch to next scene
	 * @param scene {Scene} class for every scene which renderer could render
	 * @returns {LOMSRenderer}
	 */
	renderScene(scene) {
		scene.setRenderer(this);
		this._setAssetLoadingListener(scene.onAssetsFinish());
		this._prepareAssets(scene.getAssetsDate());
		return this;
	}
	
	/**
	 * get controller instance
	 * @returns {Controller} class for gamer input control
	 */
	getController() {
		return this._controller;
	}
	
	/**
	 * add terrain to stage
	 * @param terrain {Terrain}
	 * @returns {LOMSRenderer}
	 */
	addTerrain(terrain) {
		this._addElementToStage(terrain);
		this._stageAgent.addTerrain(terrain);
		return this;
	}
	
	/**
	 * add ui to stage
	 * @param ui {UIText}
	 * @returns {LOMSRenderer}
	 */
	addUI(ui){
		this._addElementToStage(ui);
		this._stageAgent.addUI(ui);
		return this;
	}
	
	/**
	 * add actor to stage
	 * @param actor {Actor}
	 * @returns {LOMSRenderer}
	 */
	addActor(actor) {
		this._addElementToStage(actor);
		this._stageAgent.addActor(actor);
		return this;
	}
	
	/**
	 *
	 * @param element {ElementCore}
	 * @returns {LOMSRenderer}
	 * @private
	 */
	_addElementToStage(element){
		if (!element.isNoAsset()) {
			element.initResources(this._resources);
		}
		return this;
	}
	
	/**
	 * clear ui and actor in current stage
	 * @returns {LOMSRenderer}
	 */
	clearStage() {
		this._stageAgent.clearUI();
		this._stageAgent.clearActors();
		return this;
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

export default LOMSRenderer;