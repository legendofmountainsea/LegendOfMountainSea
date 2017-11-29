import Mouse from './mouse';
import LayerAgent from './layerAgent';

export default class StageAgent {
	constructor(props) {
		this._renderer = props.renderer;
		this._controller = props.controller;
		this._terrain = null;
		this._mouse = null;
		this._layerAgent = null;
		this._stages = {};
	}
	
	init() {
		let hitArea = new PIXI.Rectangle(0, 0, this._renderer.view.width, this._renderer.view.height);
		this._renderer.stage.interactive = true;
		this._renderer.stage.hitArea = hitArea;
		
		this._renderer.stage.mousedown = (e) => {
			this._controller.onMouseDown({
				layerX: e.data.originalEvent.layerX,
				layerY: e.data.originalEvent.layerY,
			});
		};
		
		this._initLayerAgent();
		
		this._initMouse(hitArea);
		
		return this;
	}

	_initLayerAgent(){
		this._layerAgent = new LayerAgent({contatiner: this._renderer.stage});
	}
	
	_initMouse(hitArea) {
		/**
		 * TODO: refactor mouse component, pass renderer instance into Mouse() or pass mouse component into controller
		 */
		this._mouse = new Mouse({
			hitArea: hitArea,
			onStatusRight: ()=>{
			
			},
			onStatusLeft: ()=>{
			
			},
		}).init();
		
		this._layerAgent.addElement(this._mouse, 2);
		
		this._renderer.stage.mousemove = (e) => {
			
			const {layerX, layerY} = e.data.originalEvent;
			
			this._mouse.showAtPosition({
				x: layerX,
				y: layerY,
			});
			
		};
		
		this._renderer.stage.mouseout = (e) => {
			this._mouse.setOut(true);
		};
		
		this._renderer.stage.mouseover = (e) => {
			this._mouse.setOut(false);
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
