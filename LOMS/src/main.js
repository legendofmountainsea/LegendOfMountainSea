import LOMSRenderer from './render/lomsRenderer';

var mainRenderer = new LOMSRenderer;

mainRenderer.initRenderer();

mainRenderer.addResource('logo','./LOMS.png',(logo)=>{

    let sprite = new PIXI.Sprite(logo.texture);

    sprite.position.x = 400;
    sprite.position.y = 300;

    sprite.scale.x = 1;
    sprite.scale.y = 1;

    mainRenderer.loadSprite(sprite);

    mainRenderer.render();
});
