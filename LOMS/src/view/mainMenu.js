import S_mainMenuAsset from '../static/mainMenuAsset';

import Scene from '../scene/scene';

import Pattern from '../render/pattern';
import Character from '../render/character';
import Pawn from '../control/pawn';
import UIText from '../render/uiText';
import Style from '../static/textStyle';
import WorldScene from '../scene/worldScene';

export default class MainMenu extends Scene {
    constructor(props) {
        super(props);
        this._assetsData = S_mainMenuAsset;
        this._onFinish = this.onFinish.bind(this);
    }

    onFinish() {

        var audio = new Audio('../../assets/sound/Angelic_Happiness.mp3');
        audio.play();

        let logo = new Pattern({
            assetData: this._assetsData.LOGO,
            position: { x: 200, y: 200 },
        });

        logo.bindRender((sprite, delta) => {
            sprite.rotation += (0.01 * delta);
        });

        let newGameText = new UIText({
            string: 'New Game',
            position: { x: 300, y: 400 },
            style: Style.MAIN_MENU,
            onClick: (e) => {
                this.dispose();
                const worldScene = new WorldScene;
                this._renderer.renderScene(worldScene);
            }
        });

        this._renderer.addActor(newGameText);
        this._renderer.addActor(logo);

        return this;
    }

    dispose(){
        this._renderer.clearStage();
        return this;
    }
}