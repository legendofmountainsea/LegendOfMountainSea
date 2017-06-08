import LOMSRenderer from './render/lomsRenderer';
import Controller from './control/controller';

import MainMenu from './view/mainMenu';

class LOMSGame {
    constructor() {
        this._renderer = new LOMSRenderer;
        this._controller = new Controller;
    }

    beginGame() {

        const renderer = this._renderer,
            controller = this._controller;

        new MainMenu({ renderer, controller }).render();

        this._renderer.render();
    }
}

if (typeof window !=="undefined" && root===window) {
    
} else {
    const app = new LOMSGame;
    app.beginGame();
}
