export default class StageAgent {
    constructor(engineProps) {
        this._engineProps = engineProps;
        this._stages = {};
        this._size = 0;
    }

    init() {
        const {renderer, controller} = this._engineProps;
        renderer.stage.interactive = true;
        renderer.stage.hitArea = new PIXI.Rectangle(0, 0, 980, 725);
        renderer.stage.mousedown = (e) => {
            controller.onMouseDown(e);
            console.log(e.data.originalEvent.layerX, e.data.originalEvent.layerY);
        };

        return this;
    }

    addActor(actor) {
        let ID = ++this._size;

        actor.setID(ID);

        this._stages[ID] = actor;

        this._engineProps.renderer.stage.addChild(this._stages[ID].getSprite());

        return this;
    }

    clearActors() {
        this._size = 0;
        for (let actorID in this._stages) {

            this._engineProps.renderer.stage.removeChild(this._stages[actorID].getSprite());
            this._stages[actorID] = null;
            delete this._stages[actorID];
        }
        return this;
    }

    render(delta) {
        for (let actorID in this._stages) {
            this._stages[actorID].render(delta);
        }
        return this;
    }
}