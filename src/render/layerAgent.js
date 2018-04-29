import {uuid} from 'loms.uuid';
import Coordinates from '../core/coordinates';

export default class LayerAgent {
	constructor(props) {
		this._container = props.contatiner;
		this._layer = {};
	}
	
	addElement(element, index = 0) {
		
		element.setID(uuid()).setIndex(index);
		
		const result = this._getTopElementInLayer(index);
		
		const childIndex = (result) ? this._container.getChildIndex(result.getRenderObject()) : 0;
		
		this._addToLayer(element, index);
		
		this._container.addChildAt(element.getRenderObject(), childIndex);
		
		return this;
	}
	
	updateDepthRenderOrder() {
		this._container.children.sort((a, b) => {
			const elementA = this._getElement(a),
				elementB = this._getElement(b);
			
			if (elementA.getIndex() < elementB.getIndex() || elementA.getPosition().y < elementB.getPosition().y) {
				return -1;
			}
			
			return 1;
		});
		
		for (const index in this._layer) {
			let layer = this._layer[index];
			layer.sort((a, b) => {
				
				const positionA = a.getPosition(),
					positionB = b.getPosition();
				
				if (positionA.y > positionB.y) {
					return -1;
				}
				
				return 1;
			});
		}
	}
	
	removeElement(element, option) {
		this._removeFromLayer(element, element.getIndex());
		this._container.removeChild(element.getRenderObject());
		element.dispose(option);
	}
	
	moveLayerTo(layerTo) {
		for (const movingInfo of layerTo) {
			
			if (!this._layer[movingInfo.index]) {
				continue;
			}
			
			let deltaX = 0,
				deltaY = 0;
			
			for (const element of this._layer[movingInfo.index]) {
				
				deltaX = (movingInfo.deltaX) ? (movingInfo.deltaX) : 0;
				deltaY = (movingInfo.deltaY) ? (movingInfo.deltaY) : 0;
				
				element.setTransform(new Coordinates(deltaX, deltaY));
			}
		}
	}
	
	removeElementsByIndex(index, option) {
		let elements = this._layer[index];
		
		this._layer[index] = null;
		delete this._layer[index];
		
		if (!elements || elements.length === 0) {
			return;
		}
		
		for (let element of elements) {
			this._container.removeChild(element.getRenderObject());
			element.dispose(option);
		}
	}
	
	_addToLayer(element, index) {
		if (!this._layer[index]) {
			this._layer[index] = [];
		}
		
		this._layer[index].push(element);
	}
	
	_getElement(renderObject) {
		for (const index in this._layer) {
			
			let layer = this._layer[index];
			for (let i = 0; i < layer.length; ++i) {
				if (layer[i].getRenderObject() === renderObject) {
					return layer[i];
				}
			}
		}
		
		return null;
	}
	
	_removeFromLayer(element, index) {
		let layer = this._layer[index];
		for (let i = 0; i < layer.length; ++i) {
			if (layer[i].getID() === element.getID()) {
				layer.splice(i, 1);
				break;
			}
		}
		
		return this;
	}
	
	_getTopElementInLayer(index) {
		let elements = null;
		
		for (let layerIndex = index; layerIndex > 0; --layerIndex) {
			
			if (this._layer[layerIndex] && this._layer[layerIndex].length > 0) {
				elements = this._layer[layerIndex];
				break;
			}
		}
		
		return elements ? elements[0] : null;
	}
	
	tick(delta) {
		for (let index in this._layer) {
			for (let element of this._layer[index]) {
				element.render(delta);
			}
		}
	}
	
	render(delta) {
		this.tick(delta);
	}
}