import LayerAgent from './layerAgent';

/**
 * a class for managing elements on stage
 */
class StageAgent {
	/**
	 * create a stage agent
	 * @param props {Object}
	 * @param props.renderer {LOMSRenderer} renderer instance
	 * @param props.controller {Controller} controller instance
	 */
	constructor(props) {
		props = props || {};
		this._renderer = props.renderer;
		this._controller = props.controller;
		this._terrain = null;
		this._layerAgent = null;
	}
	
	ACTOR_LAYER_INDEX = 0;
	TERRAIN_LAYER_INDEX = 1;
	UI_LAYER_INDEX = 2;
	MOUSE_LAYER_INDEX = 3;

	/**
	 * init stage
	 * @returns {StageAgent}
	 */
	init() {
		let hitArea = new PIXI.Rectangle(0, 0, this._renderer.view.width, this._renderer.view.height);
		this._renderer.stage.interactive = true;
		this._renderer.stage.hitArea = hitArea;
		
		this._initLayerAgent();
		
		this._initMouseEvent();
		
		return this;
	}

	_initLayerAgent() {
		this._layerAgent = new LayerAgent({container: this._renderer.stage, stage: this});
		this._layerAgent.addElement(this._controller.getMouseInstance(), this.MOUSE_LAYER_INDEX);
		return this;
	}
	
	_initMouseEvent() {
		
		this._initControllerEvent();
		
		this._renderer.stage.mousedown = (e) => {
			this._controller.onMouseDown({
				layerX: e.data.originalEvent.layerX,
				layerY: e.data.originalEvent.layerY,
			});
		};

		this._renderer.stage.mouseup = (e) => {
			this._controller.onMouseUp({
				layerX: e.data.originalEvent.layerX,
				layerY: e.data.originalEvent.layerY,
			});
		};
		
		this._renderer.stage.mousemove = (e) => {

			const {layerX, layerY} = e.data.originalEvent;
			
			this._controller.onMouseMove({
				x: layerX,
				y: layerY,
			});
		};
		
		this._renderer.stage.mouseout = (e) => {
			this._controller.setMouseOutEdge(true);
		};
		
		this._renderer.stage.mouseover = (e) => {
			this._controller.setMouseOutEdge(false);
		};
	}
	
	_initControllerEvent(){
		this._controller.bindOnMouseDrag((delta) => {
			this._layerAgent.moveLayerTo(
				[{index: this.ACTOR_LAYER_INDEX, deltaX: delta.deltaX, deltaY: delta.deltaY},
					{index: this.TERRAIN_LAYER_INDEX, deltaX: delta.deltaX, deltaY: delta.deltaY}],
			);
		});
		
		return this;
	}

	onClickEventTrigger(e){
		this._controller.onMouseClick(e);
	}

	/**
	 * add a terrain scene to render
	 * @param terrain {Terrain} terrain scene
	 * @returns {StageAgent}
	 */
	addTerrain(terrain) {
		this._terrain = terrain;
		
		this._layerAgent.addElement(this._terrain, this.TERRAIN_LAYER_INDEX);
		
		return this;
	}

	/**
	 * add a ui element to render
	 * @param uiElement {UIText | Pattern} ui element
	 * @returns {StageAgent}
	 */
	addUI(uiElement) {
		this._layerAgent.addElement(uiElement, this.UI_LAYER_INDEX);
		return this;
	}

	/**
	 * add a actor to render
	 * @param actor {Actor}
	 * @returns {StageAgent}
	 */
	addActor(actor) {
		this._layerAgent.addElement(actor, this.ACTOR_LAYER_INDEX);
		return this;
	}

	/**
	 * clear all actors
	 * @returns {StageAgent}
	 */
	clearActors() {
		this._layerAgent.removeElementsByIndex(this.ACTOR_LAYER_INDEX, true);
		return this;
	}

	/**
	 * clear all UI
	 * @returns {StageAgent}
	 */
	clearUI() {
		this._layerAgent.removeElementsByIndex(this.UI_LAYER_INDEX, true);
		return this;
	}
	
	render(delta) {
		
		this._layerAgent.render(delta);
		
		return this;
	}
}

export default StageAgent;