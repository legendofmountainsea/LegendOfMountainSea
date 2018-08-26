//@flow
import StageAgent from './stageAgent';
import Coordinates from '../core/coordinates';
import type { AnimationAssetType, NoneAnimationAssetType } from '../static/type/assetDataType';

type ElementCorePropsType = {
    assetData?: NoneAnimationAssetType | AnimationAssetType,
};
/**
 * Common element class which render on the map.
 **/
class ElementCore {

	_ID: string | null;
    _stage: StageAgent | null;
    _index: number;
    _noAsset: boolean;

	/**
	 * Create a render element
	 * @param props {Object} element props json object
	 * @param props.assetData {Object} element asset data information
	 */
	constructor(props: ElementCorePropsType) {
		this._ID = null;
		this._stage = null;
		this._index = 0;
		this._noAsset = !props.assetData;
	}

    /**
	 * init asset resource for render
     * @param resources {object} game resources info object
     * @returns {ElementCore}
	 * @abstract
     */
	initResources(resources: Object): ElementCore{
		return this;
	}
	
	/**
	 * check element has asset or not
	 * @returns {boolean} return true if element has asset
	 */
	isNoAsset(): boolean {
		return this._noAsset;
	}
	
	/**
	 * set object's ID
	 * @param ID {string}
	 * @returns {ElementCore}
	 */	setID(ID: string) {
		this._ID = ID;
		return this;
	}

	/**
	 * set stage instance
	 * @param stage {StageAgent} a StageAgent instance
	 * @returns {ElementCore}
	 */
	setStage(stage: StageAgent) {
		this._stage = stage;
		return this;
	}

	/**
	 * get stage instance
	 * @returns {null|*}
	 */
	getStage() {
		return this._stage;
	}
	
	/**
	 * set object's render index
	 * @param index {number}
	 * @returns {ElementCore}
	 */
	setIndex(index: number){
		this._index = index;
		return this;
	}
	
	/**
	 * get object's ID
	 * @returns {null|string}
	 */
	getID(): string| null {
		return this._ID;
	}
	
	/**
	 * get object's render index
	 * @returns {number}
	 */
	getIndex(): number {
		return this._index;
	}
	
	/**
	 * make render object transform by vector
	 * @param transform {Coordinates}
	 * @abstract
	 */
	setTransform(transform: Coordinates): ElementCore{
		return this;
	}
	
	/**
	 * get render object
	 * @return {object}
	 * @abstract
	 */
	getRenderObject(): any{
	}
	
	/**
	 * get render position on render canvas
	 * @return {Coordinates}
	 * @abstract
	 */
	getPosition(): Coordinates{
		return new Coordinates(0,0);
	}
	
	/**
	 * tick function for renderer
	 * @param delta {number}
	 * @abstract
	 */
	tick(delta: number) {
	}
	
	/**
	 * render function
	 * @param delta {number}
	 * @abstract
	 */
	render(delta: number) {
	}
	
	/**
	 * render callback interface function
	 * @param delta {number}
	 * @abstract
	 */
	onRender(delta: number){
	
	}
	
	/**
	 * dispose element on the map or in memory
	 * @param option {boolean} remove from memory or not
	 */
	dispose(option: boolean){
		this._ID = null;
		this._stage = null;
	}
}

export default ElementCore;