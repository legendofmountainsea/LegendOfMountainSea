export default class LayerAgent {
	constructor(props) {
		this._stage = props.stage;
		this._layer = {};
	}
	
	addElement(element, index = 0) {

		element.setIndex(index);
		
		const result = this._getTopElementInLayer(index);
		
		const childIndex = (result) ? this._stage.getChildIndex(result.getElement()) : 0;
		
		this._stage.addChildAt(element.getElement(), childIndex);
		
		this._addToLayer(element, index);
		
		return this;
	}
	
	removeElementsByIndex(index){
		let elements = this._layer[index];
		if(!elements || elements.length === 0 ){
			return;
		}
		
		for( let element of elements){
			this._stage.removeChild(element.getElement());
			element.dispose();
			
			this._layer[index] = null;
			delete this._layer[index];
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
		
		return elements? elements[0] : null;
	}
	
	render(delta) {
		for(let index in this._layer){
			for(let element of this._layer[index]){
				element.render(delta);
			}
		}
	}
}