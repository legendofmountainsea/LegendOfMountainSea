//@flow
import * as PIXI from 'pixi.js';
import Actor from './actor';
import type Coordinates from '../core/coordinates';
import type { NoneAnimationAssetType } from '../static/type/assetDataType';

type PatternPropsType = {
	assetData?: NoneAnimationAssetType,
	position: Coordinates,
	onRender?: (any,number) => void,
	onClick?: void => void,
}

/**
 * class for rendering static element
 * @extends Actor
 */
class Pattern extends Actor {
	constructor(props: PatternPropsType) {
		super(props);
	}
	
	getName() {
		const assetData: NoneAnimationAssetType | null = this._assetData;

		if(!assetData || !assetData.DATA){
			return null;
		}

		return assetData.DATA.NAME;
	}
	
	initResources(resources: Object) {
		let resource = resources[this.getName()];

		this._sprite = new PIXI.Sprite(resource.texture);
		
		this._sprite.anchor.set(0.5, 0.5);
		
		this._sprite.position.x = this._initPosition.x;
		this._sprite.position.y = this._initPosition.y;
		
		this._initMouseEvent();
		
		return this;
	}
	
	_initMouseEvent(){
		const onClick = this._onClick;
		if (onClick) {
			this._sprite.interactive = true;
			this._sprite.mousedown = (e) => {
				onClick(e);
			};
			this._sprite.cursor = null;
		}
	}
}

export default Pattern;