export default class ElementCore {
	constructor(props) {
		this._ID = null;
		this._index = 0;
	}
	
	setID(ID) {
		this._ID = ID;
		return this;
	}
	
	setIndex(index){
		this._index = index;
		return this;
	}
	
	getID() {
		return this._ID;
	}
	
	getIndex(){
		return this._index;
	}
	
	setTransform(transform){
		//override in subClass
	}
	
	getRenderObject(){
		//override in subClass
	}
	
	getPosition(){
		//override in subClass
	}
	
	dispose(option){
		//override in subClass
	}
}