//@flow
import {uuid} from 'loms.uuid';
import { SeedCrashingError } from '../util/errorUtil';

type RandomSeedPropsType = {
	seed: string | null
};

class RandomSeed {

	_seed: string | null;
	_seedNumber: number;

	constructor(props: RandomSeedPropsType){
		this._seed = props.seed || this._getDefaultSeed();
		this._seedNumber = this._getSeedNumber();
	}

	_getSeedNumber(): number {

		const seed = this._seed;
		if(!seed){
			throw SeedCrashingError();
		}

		let number = 0;
		for(const seedCharacter of seed) {
			number += seedCharacter.charCodeAt(0);
		}

		return number;
	}
	
	_getDefaultSeed(): string {
		return uuid();
	}
	
	setSeedNumber(seed: number): void {
		this._seedNumber = seed;
	}
	
	getSeedNumber(): number {
		return this._seedNumber;
	}

	getSeed(){
		return this._seed;
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