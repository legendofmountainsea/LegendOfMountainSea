export default class RandomSeed {
	constructor(props){
		props = props || {};
		this._seed = props.seed || this._getDefaultSeed();
	}
	
	_getDefaultSeed(){
		let today = new Date(Date.now());
		this._seed = today.getYear() + today.getMonth() + today.getDate() + today.getHours() + today.getMinutes() + today.getSeconds();
	}
	
	setSeed(seed){
		this._seed = seed;
	}
	
	getSeed(){
		return this._seed;
	}
	
	random(min, max){
		max = max || 1;
		min = min || 0;
		
		this._seed = (this._seed * 9301 + 49297) % 233280;
		let rnd = this._seed / 233280.0;
		
		return min + rnd * (max - min);
	}
}