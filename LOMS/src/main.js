import LOMSRenderer from './render/lomsRenderer';
import Controller from './control/controller';

var mainRenderer = new LOMSRenderer,
    controller = new Controller;

mainRenderer.initRenderer();

mainRenderer.addResource('logo', './LOMS.png', (logo) => {

    let sprite = new PIXI.Sprite(logo.texture);

    sprite.position.x = 400;
    sprite.position.y = 300;

    mainRenderer.loadSprite(sprite);

});

mainRenderer.render();