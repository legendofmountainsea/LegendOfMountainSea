import S_worldAsset from '../static/heroCharecter/heroAsset';
import S_worldTerrainAsset from '../static/terrain/worldTerrainAsset';

import Scene from './scene';
import Pawn from '../control/pawn';
import Character from '../render/character';
import Terrain from '../render/terrain';

export default class WorldScene extends Scene {
    constructor(props) {
        super(props);
        this._assetsData = [S_worldAsset,S_worldTerrainAsset];
        this._onFinish = this.onFinish.bind(this);
    }

    onFinish() {

        let worldTerrain = new Terrain({
            assetData: S_worldTerrainAsset.TERRAIN,
        });
        this._renderer.addTerrain(worldTerrain);

        let houyi = new Character({
            assetData: S_worldAsset.HOUYI,
            position: { x: 100, y: 400 },
        });

        const controller = this._renderer.getController();
        controller.possess(new Pawn({ character: houyi }));

        this._renderer.addActor(houyi);
    }
}