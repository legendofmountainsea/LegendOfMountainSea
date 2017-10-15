import './vendor/pixi.min.js';
import './vendor/pixi-display.min.js';

import LOMSRenderer from './render/lomsRenderer';
import MainMenu from './view/mainMenu';

export default class LOMS {
    constructor() {
        this._renderer = new LOMSRenderer;
    }

    beginGame() {
        this._renderer.renderScene(new MainMenu);
        this._renderer.render();
    }
}
