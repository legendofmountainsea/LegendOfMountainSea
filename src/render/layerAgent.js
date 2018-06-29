import {uuid} from 'loms.uuid';
import Coordinates from '../core/coordinates';

/**
 * a class for managing elements' index and instance on layer
 */
class LayerAgent {
	/**
	 * create a layer agent
	 * @param props {Object}
	 * @param props.container {Object} pixijs container class
	 * @param props.stage {StageAgent} StageAgent instance
	 */
	constructor(props) {
		this._container = props.container;
		this._stage = props.stage;
		this._layer = {};
	}

	/**
	 * add elememt to this layer
	 * @param element {ElementCore} instance of this element
	 * @param index {number} index order of this element
	 * @returns {LayerAgent}
	 */
	addElement(element, index = 0) {
		
		element.setID(uuid()).setIndex(index).setStage(this._stage);
		
		const result = this._getTopElementInLayer(index);
		
		const childIndex = (result) ? this._container.getChildIndex(result.getRenderObject()) + 1 : 0;
		
		this._addToLayer(element, index);
		
		this._container.addChildAt(element.getRenderObject(), childIndex);
		
		return this;
	}

	_getTopElementInLayer(index) {
		let elements = null;

		for (let layerIndex = index; layerIndex >= 0; --layerIndex) {

			if (this._layer[layerIndex] && this._layer[layerIndex].length > 0) {
				elements = this._layer[layerIndex];
				break;
			}
		}

		return elements ? elements[0] : null;
	}

	/**
	 * algorithm for sorting element in children array to render current
	 * e.g. building that could block character in front
	 */
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

	/**
	 * remove element from this layer
	 * @param element {ElementCore} element instance
	 * @param option {boolean} dispose all the resource that relate to the element
	 * @returns {LayerAgent}
	 */
	removeElement(element, option) {
		this._removeFromLayer(element, element.getIndex());
		this._container.removeChild(element.getRenderObject());
		element.dispose(option);
		return this;
	}

	/**
	 * move layer
	 * @param layerTo {Array} layer movement information
	 * @returns {LayerAgent}
	 */
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

		return this;
	}

	/**
	 * remove elements by index
	 * @param index {number} index which element should be removed
	 * @param option {boolean} dispose all the resource that relate to the element
	 * @returns {LayerAgent}
	 */
	removeElementsByIndex(index, option) {
		let elements = this._layer[index];
		
		this._layer[index] = null;
		delete this._layer[index];
		
		if (!elements || elements.length === 0) {
			return this;
		}
		
		for (let element of elements) {
			this._container.removeChild(element.getRenderObject());
			element.dispose(option);
		}

		return this;
	}

	_addToLayer(element, index) {
		if (!this._layer[index]) {
			this._layer[index] = [];
		}
		
		this._layer[index].push(element);

		return this;
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

export default LayerAgent;