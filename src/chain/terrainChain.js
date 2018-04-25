import Perlin from 'loms.perlin';
import Coordinates from '../core/coordinates';
import RandomSeed from '../core/randomSeed';
import S_worldTerrainAsset, {ASSETS_ID} from '../static/terrain/worldTerrainAsset';

export const ASSETS_NUMBER = 4;

let renderCenter = null;
let seed = null;
export default class TerrainChain {
	static _initRenderCenter(){
		renderCenter = new Coordinates(0,0);

		return this;
	}
	
	static updateCenterCoordinates(coordinates) {
		if (!renderCenter) {
			TerrainChain._initRenderCenter();
		}
		
		renderCenter.set({
			x: renderCenter.x + coordinates.x,
			y: renderCenter.y + coordinates.y,
		});
		
		return this;
	}
	
	static getCenterCoordinates() {
		if (!renderCenter) {
			TerrainChain._initRenderCenter();
		}
		
		return renderCenter;
	}
	
	// TODO: init seed in other place
	static getTerrainAssetData(renderPoint) {
		if (!seed) {
			seed = new RandomSeed();
		}
		Perlin.seed(seed.random());
		
		let vx = renderPoint.x * 0.01,
			vy = renderPoint.y * 0.2;
		
		
		let noise = Perlin.perlin2(vx, vy);
		let height = parseInt((noise * 255)) + 135;
		
		return TerrainChain.getAssetData(TerrainChain.getTerrainType(height));
	}
	
	static getTerrainType(height) {
		let type = null;
		if (height > 200) {
			type = ASSETS_ID.HILL_ID;
		} else if (height > 150) {
			type = ASSETS_ID.FOREST_ID;
		} else if (height > 100) {
			type = ASSETS_ID.RIVER_ID;
		} else {
			type = ASSETS_ID.SWAMP_ID;
		}
		
		return type;
	}
	
	static getAssetData(id) {
		let asset = null;
		switch (id) {
			case ASSETS_ID.FOREST_ID:
				asset = S_worldTerrainAsset.FOREST;
				break;
			case ASSETS_ID.HILL_ID:
				asset = S_worldTerrainAsset.HILL;
				break;
			case ASSETS_ID.RIVER_ID:
				asset = S_worldTerrainAsset.RIVER;
				break;
			case ASSETS_ID.SWAMP_ID:
				asset = S_worldTerrainAsset.SWAMP;
				break;
			default:
				break;
		}
		
		return asset;
	}
}