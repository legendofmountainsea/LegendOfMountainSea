//@flow
import {uuid} from 'loms.uuid';

type RandomSeedPropsType = {
	seed: string | null
};

class RandomSeed {

	_seed: string;
	_seedNumber: number;

	constructor(props: RandomSeedPropsType){
		this._seed = props.seed || uuid();
		this._createSeedNumber(this._seed);
	}

	_createSeedNumber(seed: string): void {
		let number = 0;
		for(const seedCharacter of seed) {
			number += seedCharacter.charCodeAt(0);
		}

		this._seedNumber = number;
	}

	_setSeedNumber(seed: number): void {
		this._seedNumber = seed;
	}
	
	getSeedNumber(): number {
		return this._seedNumber;
	}

	getSeed(): string {
		return this._seed;
	}

	setSeed(seed: string) {
		this._seed = seed;
		this._createSeedNumber(seed);
	}
	
	random(min?: number, max?: number): number{
		max = max || 1;
		min = min || 0;
		
		this._seedNumber = (this._seedNumber * 9301 + 49297) % 233280;
		let rnd = this._seedNumber / 233280.0;
		
		return min + rnd * (max - min);
	}
}

export default RandomSeed;