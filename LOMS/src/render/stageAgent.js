import Mouse from './mouse';

export default class StageAgent {
	constructor(props) {
		this._renderer = props.renderer;
		this._controller = props.controller;
		this._terrain = null;
		this._mouse = null;
		this._stages = {};
		this._size = 0;
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
		
		this._initMouse(hitArea);
		
		return this;
	}
	
	_initMouse(hitArea) {
		/**
		 * TODO: refactor mouse component, pass renderer instance into Mouse() or pass mouse component into controller
		 */
		this._mouse = new Mouse({
			hitArea: hitArea,
		}).init();
		
		this._renderer.stage.addChild(this._mouse.getSprite());
		
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
		
		this._renderer.stage.addChildAt(this._terrain.getContainer(), 0);
		
		return this;
	}
	
	addActor(actor) {
		let ID = ++this._size;
		
		actor.setID(ID);
		
		this._stages[ID] = actor;
		
		this._renderer.stage.addChildAt(this._stages[ID].getSprite(), 0);
		
		return this;
	}
	
	clearActors() {
		this._size = 0;
		for (let actorID in this._stages) {
			
			this._renderer.stage.removeChild(this._stages[actorID].getSprite());
			this._stages[actorID] = null;
			delete this._stages[actorID];
		}
		return this;
	}
	
	render(delta) {
		for (let actorID in this._stages) {
			this._stages[actorID].render(delta);
		}
		
		if (this._terrain) {
			this._terrain.render(delta);
		}
		
		this._mouse.render(delta);
		
		return this;
	}
}
