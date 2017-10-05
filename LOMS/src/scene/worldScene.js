import S_worldAsset from '../static/heroCharecter/heroAsset';

import Scene from './scene';
import Pattern from '../render/pattern';
import Pawn from '../control/pawn';
import Character from '../render/character';
import UIText from '../render/uiText';
import Terrain from '../render/terrain';

export default class WorldScene extends Scene {
    constructor(props) {
        super(props);
        this._assetsData = S_worldAsset;
        this._onFinish = this.onFinish.bind(this);
    }

    onFinish() {
        let worldTerrain = new Terrain({
            scale: { maxCol: 15, maxRow: 15 },
            measurement: 160,
        });
        this._renderer.addTerrain(worldTerrain);

        let houyi = new Character({
            assetData: this._assetsData.HOUYI,
            position: { x: 0, y: -400 },
        });

        const controller = this._renderer.getController();
        controller.possess(new Pawn({ character: houyi }));

        this._renderer.addActor(houyi);
    }
}