import expect from 'expect.js';
import RandomSeed from '../../src/core/randomSeed';

describe('RandomSeed', () => {
	let randomSeed;
	
	beforeEach(() => {
		randomSeed = new RandomSeed({
			seed:'01CT6BN9P32TJRS27SAFDFVS7H',
		});
	});
	
	afterEach(() => {
		randomSeed = null;
	});
	
	it('seed 01CT6BN9P32TJRS27SAFDFVS7I first random number should always be 0.5429569615912209', () => {
		expect(randomSeed.random()).to.be(0.5429569615912209);
		randomSeed.setSeed('01CT6BN9P32TJRS27SAFDFVS7H');
		expect(randomSeed.random()).to.be(0.5429569615912209);
	});
	
	it('seed 01CT6BN9P32TJRS27SAFDFVS7I second random number should always be 0.25402091906721536', () => {
		randomSeed.random();
		expect(randomSeed.random()).to.be(0.25402091906721536);
		randomSeed.setSeed('01CT6BN9P32TJRS27SAFDFVS7H');
		randomSeed.random();
		expect(randomSeed.random()).to.be(0.25402091906721536);
	});
	
	it('seed 01CT6BN9P32TJRS27SAFDFVS7I first random number should not be 0.10555126886145405', () => {
		randomSeed.setSeed('01CT6BN9P32TJRS27SAFDFVS7I');
		expect(randomSeed.random()).to.not.be(0.5429569615912209);
		randomSeed.setSeed('01CT6BN9P32TJRS27SAFDFVS7I');
		expect(randomSeed.random()).to.not.be(0.5429569615912209);
	});
	
});
