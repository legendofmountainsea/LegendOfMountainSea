import Actor from './actor';
export default class StageAgent {
    constructor(engineProps) {
        this._engineProps = engineProps;
        this._stages = {};
        this._size = 0;
    }

    init() {
        const {renderer,controller} = this._engineProps;
        renderer.stage.interactive = true;
        renderer.stage.hitArea = new PIXI.Rectangle(0, 0, 990, 768);
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

    render(delta) {
        for (let actorID in this._stages) {
            this._stages[actorID].render(delta);
        }
        return this;
    }
}