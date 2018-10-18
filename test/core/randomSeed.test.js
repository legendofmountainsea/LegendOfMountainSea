import expect from 'expect.js';
import RandomSeed from '../../src/core/randomSeed';

describe('RandomSeed', () => {
	let randomSeed;
	
	beforeEach(() => {
		randomSeed = new RandomSeed({
			seed:null,
		});

		randomSeed.setSeedNumber(1126);
	});
	
	afterEach(() => {
		randomSeed = null;
	});
	
	it('seed 1126 first random number should always be 0.10555126886145405', () => {
		expect(randomSeed.random()).to.be(0.10555126886145405);
		randomSeed.setSeedNumber(1126);
		expect(randomSeed.random()).to.be(0.10555126886145405);
	});
	
	it('seed 1126 second random number should always be 0.9436728395061729', () => {
		randomSeed.random();
		expect(randomSeed.random()).to.be(0.9436728395061729);
		randomSeed.setSeedNumber(1126);
		randomSeed.random();
		expect(randomSeed.random()).to.be(0.9436728395061729);
	});
	
	it('seed 2 first random number should not be 0.10555126886145405', () => {
		randomSeed.setSeedNumber(2);
		expect(randomSeed.random()).to.not.be(0.10555126886145405);
		randomSeed.setSeedNumber(2);
		expect(randomSeed.random()).to.not.be(0.10555126886145405);
	});
	
});
