//@flow
import Perlin from 'loms.perlin';
import Coordinates from '../core/coordinates';
import RandomSeed from '../core/randomSeed';
import S_worldTerrainAsset, {
	ASSETS_ID,
} from '../static/terrain/worldTerrainAsset';
import { EXECUTE_IN_CLIENT } from '../util/envUtil';
import Store from '../module/store';
import type { NoneAnimationAssetType } from '../static/type/assetDataType';

type hexagonSizeType = {
	height: number,
	width: number,
};

export const COS_30_DEGREES = Math.cos(Math.PI / 6);

let seed: string | null = null;
let renderStartingCoordinates: Coordinates = new Coordinates(0, 0);
let hexagonSize: hexagonSizeType = { height: 0, width: 0 };

/**
 * class for connecting data and terrain
 */
class TerrainChain {
	static updateRenderStartingCoordinates(coordinates: Coordinates) {
		renderStartingCoordinates.set({
			x: renderStartingCoordinates.x + coordinates.x,
			y: renderStartingCoordinates.y + coordinates.y,
		});

		return this;
	}

	static getRenderStartingCoordinates() {
		return renderStartingCoordinates;
	}

	static setHexagonSize(size: hexagonSizeType) {
		hexagonSize = size;
	}

	static getHexagonSize(): hexagonSizeType {
		return hexagonSize;
	}

	static adjustHexagonRenderPosition(position: Coordinates): Coordinates {
		let x =
			hexagonSize.width / 2 +
			position.x * (hexagonSize.height * COS_30_DEGREES),
			y =
				position.y * hexagonSize.height +
				(hexagonSize.height / 2) * (1 + (Math.abs(position.x) % 2));

		return new Coordinates(x, y);
	}

	/**
	 * get terrain asset data for render by render coordinates point
	 * @param renderPoint {Coordinates}
	 * @returns {Object}
	 */
	static getTerrainAssetData(
		renderPoint: Coordinates,
	): NoneAnimationAssetType {
		const { height } = TerrainChain.getTerrainNavigationInfo(renderPoint);

		return TerrainChain.getAssetData(TerrainChain.getTerrainType(height));
	}

	/**
	 * get navigation information about giving point
	 * @param renderPoint
	 * @returns {{height: number}}
	 */
	static getTerrainNavigationInfo(renderPoint: Coordinates): Object {

		const seedNumber = new RandomSeed({seed: TerrainChain.getSeed()});

		Perlin.seed(seedNumber.getSeedNumber());

		let vx = renderPoint.x * 0.01,
			vy = renderPoint.y * 0.2;

		let noise = Perlin.perlin2(vx, vy);
		let height = parseInt(noise * 255) + 135;

		return {
			height,
		};
	}

	/**
	 * get seed number
	 * @returns {number}
	 */
	static getSeed(): string {
		if (seed === null) {

			EXECUTE_IN_CLIENT(() => {
				seed = Store.getConfig().seed;
			});

			if (seed === null) {
				seed = new RandomSeed({
					seed: null,
				}).getSeed();
				Store.addConfig({seed: seed});
			}
		}

		return seed;
	}

	static getTerrainType(height: number) {
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

	static getAssetData(id: string): NoneAnimationAssetType {
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
				asset = S_worldTerrainAsset.HILL;
				break;
		}

		return asset;
	}
}

export default TerrainChain;
