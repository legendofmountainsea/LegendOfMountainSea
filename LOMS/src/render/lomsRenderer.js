import StageAgent from './stageAgent';

export default class LOMSRenderer {

    initRenderer() {

        this._renderer = new PIXI.Application(800, 600, { backgroundColor: 0xeeeeee });

        this._stageAgent = new StageAgent(this._renderer);

        document.body.appendChild(this._renderer.view);
    }

    addActor(actor){
        PIXI.loader.add(actor.getName(), actor.getPath()).load((loader, resources) => {

            actor.initResouce(resources[actor.getName()]);

            this._stageAgent.addActor(actor);
        });
    }

    render() {
        this._renderer.ticker.add((delta) => {
            this._stageAgent.render(delta);
        });
    }
}