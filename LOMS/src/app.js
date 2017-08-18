import 'pixi.js';

import LOMSRenderer from './render/lomsRenderer';
import Controller from './control/controller';

import MainMenu from './view/mainMenu';

export default class LOMS {
    constructor() {
        this._renderer = new LOMSRenderer;
        this._controller = new Controller;
    }

    beginGame() {

        new MainMenu({
            renderer: this._renderer,
            controller: this._controller
        });

        this._renderer.render();
    }
}
