import LOMSRenderer from './render/lomsRenderer';
import Controller from './control/controller';

class LOMSGame {
    constructor() {
        this._renderer = new LOMSRenderer;
        this._controller = new Controller;
    }

    beginGame() {
        this._renderer.initRenderer();

        this._renderer.addResource('logo', './LOMS.png', (logo) => {

            let sprite = new PIXI.Sprite(logo.texture);

            sprite.position.x = 400;
            sprite.position.y = 300;

            this._renderer.loadSprite(sprite);

        });

        this._renderer.render();
    }
}

const app = new LOMSGame;
app.beginGame();