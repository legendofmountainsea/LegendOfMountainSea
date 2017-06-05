import 'pixi.js';
import StageAgent from './stageAgent';

export default class LOMSRenderer {

    initRenderer() {

        this._renderer = new PIXI.Application(800, 600, { backgroundColor: 0xeeeeee });

        this._stageAgent = new StageAgent(this._renderer);

        document.body.appendChild(this._renderer.view);
    }

    addResource(name, path) {
        PIXI.loader.add(name, path).load((loader, resources) => {

            this._stageAgent.addActors(resources[name]);
        });
    }

    render() {
        this._renderer.ticker.add((delta) => {
            this._stageAgent.render(delta);
        });
    }
}