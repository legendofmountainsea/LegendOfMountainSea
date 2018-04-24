import Perlin from 'loms.perlin';
import Coordinates from '../core/coordinates';
import RandomSeed from '../core/randomSeed';

let terrainChainValue = {x:0,y:0};

let renderCenter = null;
let seed = null;
export default class TerrainChain {
	static getValue(){
		return terrainChainValue;
	}
	
	static setValue(value){
		terrainChainValue.x += value.x;
		terrainChainValue.y += value.y;
	}
	
	static setCenterCoordinates(coordinates){
		if(!renderCenter){
			renderCenter = new Coordinates(coordinates.x,coordinates.y);
		}
		else {
			renderCenter.set(coordinates);
		}
		
		return this;
	}
	
	static getCenterCoordinates(){
		if(!renderCenter){
			renderCenter = new Coordinates(0,0);
		}
		
		return renderCenter;
	}
	
	// TODO: init seed in other place
	static getTerrainAssetData(renderPoint){
		if(!seed){
			seed = new RandomSeed();
		}
		Perlin.seed(seed.random());
		
		let vx = renderPoint.x * 0.01,
			vy = renderPoint.y * 0.2;
		
		
		let height = Perlin.perlin2(vx, vy);
	}
}