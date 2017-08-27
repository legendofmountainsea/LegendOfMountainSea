import S_worldAsset from '../static/worldAsset';

import Scene from './scene';
import Pattern from '../render/pattern';
import Pawn from '../control/pawn';
import Character from '../render/character';
import UIText from '../render/uiText';

export default class WorldScene extends Scene {
    constructor(props) {
        super(props);
        this._assetsData = S_worldAsset;
        this._onFinish = this.onFinish.bind(this);
    }

    onFinish() {

        let houyi = new Character({
            assetData: this._assetsData.HOUYI,
            position: { x: 300, y: 400 },
        });

        const controller = this._renderer.getController();
        controller.possess(new Pawn({ character: houyi }));

        this._renderer.addActor(houyi);
    }   
}