/**
 * Common element class which render on the map.
 **/
class ElementCore {
	/**
	 * Create a render element
	 * @param props {object}
	 */
	constructor(props) {
		this._ID = null;
		this._index = 0;
		this._noAsset = !props.assetData;
	}
	
	/**
	 * init asset resource for render
	 * @param resources {object} game resources info object
	 * @abstract
	 */
	initResources(resources){
	}
	
	/**
	 * check element has asset or not
	 * @returns {boolean} return true if element has asset
	 */
	isNoAsset() {
		return this._noAsset;
	}
	
	/**
	 * set object's ID
	 * @param ID {string}
	 * @returns {ElementCore}
	 */
	setID(ID) {
		this._ID = ID;
		return this;
	}
	
	/**
	 * set object's render index
	 * @param index
	 * @returns {ElementCore}
	 */
	setIndex(index){
		this._index = index;
		return this;
	}
	
	/**
	 * get object's ID
	 * @returns {null|string}
	 */
	getID() {
		return this._ID;
	}
	
	/**
	 * get object's render index
	 * @returns {number}
	 */
	getIndex(){
		return this._index;
	}
	
	/**
	 * make render object transform by vector
	 * @param transform {Coordinates}
	 * @abstract
	 */
	setTransform(transform){
	}
	
	/**
	 * get render object
	 * @return {object}
	 * @abstract
	 */
	getRenderObject(){
	}
	
	/**
	 * get render position on render canvas
	 * @return {Coordinates}
	 * @abstract
	 */
	getPosition(){
	}
	
	/**
	 * tick function for renderer
	 * @param delta {number}
	 * @abstract
	 */
	tick(delta) {
	}
	
	/**
	 * render function
	 * @param delta {number}
	 * @abstract
	 */
	render(delta) {
	}
	
	/**
	 * render callback interface function
	 * @param delta {number}
	 * @abstract
	 */
	onRender(delta){
	
	}
	
	/**
	 * dispose element on the map or in memory
	 * @param option {boolean} remove from memory or not
	 * @abstract
	 */
	dispose(option){
	}
}

export default ElementCore;