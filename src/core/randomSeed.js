//@flow

type RandomSeedPropsType = {
	seed: number | null
};

class RandomSeed {

	_seed: number;

	constructor(props: RandomSeedPropsType){
		this._seed = props.seed || this._getDefaultSeed();
	}
	
	_getDefaultSeed(): number {
		let today: Date = new Date(Date.now());
		return today.getFullYear() + today.getMonth() + today.getDate() + today.getHours() + today.getMinutes() + today.getSeconds();
	}
	
	setSeed(seed: number){
		this._seed = seed;
	}
	
	getSeed(){
		return this._seed;
	}
	
	random(min?: number, max?: number): number{
		max = max || 1;
		min = min || 0;
		
		this._seed = (this._seed * 9301 + 49297) % 233280;
		let rnd = this._seed / 233280.0;
		
		return min + rnd * (max - min);
	}
}

export default RandomSeed;