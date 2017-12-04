import Mouse from './mouse';
import LayerAgent from './layerAgent';

export default class StageAgent {
	constructor(props) {
		this._renderer = props.renderer;
		this._controller = props.controller;
		this._terrain = null;
		this._layerAgent = null;
	}
	
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
	}
	
	_initMouse() {
		
		this._renderer.stage.mousedown = (e) => {
			this._controller.onMouseDown({
				layerX: e.data.originalEvent.layerX,
				layerY: e.data.originalEvent.layerY,
			});
		};
		
		const mouse = this._controller.getMouseInstance();
		
		mouse.bindOnStatusLeft((delta) => {
			this._layerAgent.moveLayerTo(
				{index: 0, deltaX: delta, deltaY: 0},
				{index: 1, deltaX: delta, deltaY: 0},
			);
		});
		
		mouse.bindOnStatusRight((delta) => {
			this._layerAgent.moveLayerTo(
				{index: 0, deltaX: -delta, deltaY: 0},
				{index: 1, deltaX: -delta, deltaY: 0},
			);
		});
		
		this._layerAgent.addElement(mouse, 2);
		
		this._renderer.stage.mousemove = (e) => {
			
			const {layerX, layerY} = e.data.originalEvent;
			
			mouse.showAtPosition({
				x: layerX,
				y: layerY,
			});
			
		};
		
		this._renderer.stage.mouseout = (e) => {
			mouse.setOut(true);
		};
		
		this._renderer.stage.mouseover = (e) => {
			mouse.setOut(false);
		};
	}
	
	addTerrain(terrain) {
		this._terrain = terrain;
		
		this._layerAgent.addElement(this._terrain, 1);
		
		return this;
	}
	
	addActor(actor) {
		
		this._layerAgent.addElement(actor, 0);
		
		return this;
	}
	
	clearActors() {
		this._layerAgent.removeElementsByIndex(0);
		return this;
	}
	
	render(delta) {
		
		this._layerAgent.render(delta);
		
		return this;
	}
}
