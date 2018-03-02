import LayerAgent from './layerAgent';

export default class StageAgent {
	constructor(props) {
		this._renderer = props.renderer;
		this._controller = props.controller;
		this._terrain = null;
		this._layerAgent = null;
	}
	
	ACTOR_LAYER_INDEX = 0;
	TERRAIN_LAYER_INDEX = 1;
	UI_LAYER_INDEX = 2;
	MOUSE_LAYER_INDEX = 3;
	
	init() {
		let hitArea = new PIXI.Rectangle(0, 0, this._renderer.view.width, this._renderer.view.height);
		this._renderer.stage.interactive = true;
		this._renderer.stage.hitArea = hitArea;
		
		this._initLayerAgent();
		
		this._initMouse();
		
		return this;
	}
	
	_initLayerAgent() {
		this._layerAgent = new LayerAgent({contatiner: this._renderer.stage});
		return this;
	}
	
	_initMouse() {
		
		this._layerAgent.addElement(this._controller.getMouseInstance(), this.MOUSE_LAYER_INDEX);
		
		this._controller.bindMouseOnRightEdge((delta) => {
			this._layerAgent.moveLayerTo(
				[{index: this.ACTOR_LAYER_INDEX, deltaX: -delta, deltaY: 0},
					{index: this.TERRAIN_LAYER_INDEX, deltaX: -delta, deltaY: 0}],
			);
		});
		
		this._controller.bindMouseOnLeftEdge((delta) => {
			this._layerAgent.moveLayerTo(
				[{index: this.ACTOR_LAYER_INDEX, deltaX: delta, deltaY: 0},
					{index: this.TERRAIN_LAYER_INDEX, deltaX: delta, deltaY: 0}],
			);
		});
		
		this._controller.bindMouseOnTopEdge((delta) => {
			this._layerAgent.moveLayerTo(
				[{index: this.ACTOR_LAYER_INDEX, deltaX: 0, deltaY: delta},
					{index: this.TERRAIN_LAYER_INDEX, deltaX: 0, deltaY: delta}],
			);
		});
		
		this._controller.bindMouseOnBottomEdge((delta) => {
			this._layerAgent.moveLayerTo(
				[{index: this.ACTOR_LAYER_INDEX, deltaX: 0, deltaY: -delta},
					{index: this.TERRAIN_LAYER_INDEX, deltaX: 0, deltaY: -delta}],
			);
		});
		
		this._controller.bindOnMouseMove((delta) => {
			this._layerAgent.moveLayerTo(
				[{index: this.ACTOR_LAYER_INDEX, deltaX: -delta.deltaX, deltaY: -delta.deltaY},
					{index: this.TERRAIN_LAYER_INDEX, deltaX: -delta.deltaX, deltaY: -delta.deltaY}],
			);
		});
		
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
	
	addTerrain(terrain) {
		this._terrain = terrain;
		
		this._layerAgent.addElement(this._terrain, this.TERRAIN_LAYER_INDEX);
		
		return this;
	}
	
	addUI(uiElement) {
		this._layerAgent.addElement(uiElement, this.UI_LAYER_INDEX);
		return this;
	}
	
	addActor(actor) {
		this._layerAgent.addElement(actor, this.ACTOR_LAYER_INDEX);
		return this;
	}
	
	clearActors() {
		this._layerAgent.removeElementsByIndex(this.ACTOR_LAYER_INDEX, true);
		return this;
	}
	
	clearUI() {
		this._layerAgent.removeElementsByIndex(this.UI_LAYER_INDEX, true);
		return this;
	}
	
	render(delta) {
		
		this._layerAgent.render(delta);
		
		return this;
	}
}
