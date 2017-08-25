import S_assetData from '../static/assetData';

import Scene from '../scene/scene';

import Pattern from '../render/pattern';
import Character from '../render/character';
import Pawn from '../control/pawn';
import UIText from '../render/uiText';
import Style from '../static/textStyle';

export default class MainMenu extends Scene {
    constructor(props) {
        super(props);
        this._assetsData = S_assetData;
        this._onFinish = this.render.bind(this);
    }

    render() {

        let logo = new Pattern({
            assetData: this._assetsData.LOGO,
            position: { x: 200, y: 200 },
        });

        logo.bindRender((sprite, delta) => {
            sprite.rotation += (0.01 * delta);
        });

        let houyi = new Character({
            assetData: this._assetsData.HOUYI,
            position: { x: 300, y: 400 },
        });

        let newGameText = new UIText({
            string: 'New Game',
            position: { x: 300, y: 400 },
            style: Style.MAIN_MENU,
            onClick: (e) => {
                //this._renderer.renderScene()
            }
        });

        const controller = this._renderer.getController();
        controller.possess(new Pawn({ character: houyi }));

        this._renderer.addActor(newGameText);
        this._renderer.addActor(houyi);
        this._renderer.addActor(logo);
    }
}