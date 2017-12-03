import {uuid} from 'loms.uuid';

export default class LayerAgent {
	constructor(props) {
		this._container = props.contatiner;
		this._layer = {};
		this._layerTo = [];
	}
	
	addElement(element, index = 0) {
		
		element.setID(uuid()).setIndex(index);
		
		const result = this._getTopElementInLayer(index);
		
		const childIndex = (result) ? this._container.getChildIndex(result.getElement()) : 0;
		
		this._container.addChildAt(element.getElement(), childIndex);
		
		this._addToLayer(element, index);
		
		return this;
	}
	
	moveLayerTo(...layerTo) {
		try {
			for (const movingInfo of layerTo) {
				for (const element of this._layer[movingInfo.index]) {
					
					if (movingInfo.deltaX) {
						element.getElement().x += (10 * movingInfo.deltaX);
					}
					if (movingInfo.deltaY) {
						element.getElement().y += (10 * movingInfo.deltaY);
					}
				}
			}
		}
		catch (e) {
			console.log(e);
		}
	}
	
	removeElementsByIndex(index) {
		let elements = this._layer[index];
		
		this._layer[index] = null;
		delete this._layer[index];
		
		if (!elements || elements.length === 0) {
			return;
		}
		
		for (let element of elements) {
			this._container.removeChild(element.getElement());
			element.dispose();
		}
	}
	
	_addToLayer(element, index) {
		if (!this._layer[index]) {
			this._layer[index] = [];
		}
		
		this._layer[index].push(element);
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