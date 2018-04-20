import Grid from './grid';
import Coordinates from './coordinates';
import S_worldTerrainAsset, {ASSETS_ID} from '../static/terrain/worldTerrainAsset';

export const ASSETS_NUMBER = 4;

export default class TerrainGrid extends Grid {
	constructor(props) {
		super(props);
	}
	
	getData(center, range) {
		
		const length = range.radius * 2 + 1,
			coordinatesSet = [];
		
		for (let index = 0; index < length; ++index) {
			let blockRow = [];
			for (let columnIndex = 0; columnIndex < length; ++columnIndex) {
				let coordinatesX = center.x - (range.radius - 1) - Math.floor(index / 2) + columnIndex,
					coordinatesY = center.y - range.radius + index;
				blockRow.push(new Coordinates(coordinatesX, coordinatesY));
			}
			coordinatesSet.push(blockRow);
		}
		
		return coordinatesSet;
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