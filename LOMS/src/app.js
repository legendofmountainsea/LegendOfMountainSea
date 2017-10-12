import 'pixi.js';
import 'pixi-display';

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
