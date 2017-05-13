import 'pixi.js';

export default class LOMSRenderer {

    initRenderer() {

        this._renderer = new PIXI.Application(800, 600, { backgroundColor: 0xeeeeee });

        document.body.appendChild(this._renderer.view);
    }

    addResource(name, path, onload) {
        PIXI.loader.add(name, path).load(function (loader, resources) {

            onload(resources[name]);
        });
    }

    loadSprite(sprite) {
        this._renderer.stage.addChild(sprite);
    }

    render() {
        // this._renderer.ticker.add((delta) =>{
        //     this._s.rotation += 0.01 * delta;
        // });
    }
}