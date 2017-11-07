export default class Element {
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
	
	dispose(){
		//override in subClass
	}
}