export default class StageAgent {
    constructor(props) {
        this._renderer = props.renderer;
        this._controller = props.controller;
        //this._terrain = null;
        this._stages = {};
        this._size = 0;
    }

    init() {
        this._renderer.stage.interactive = true;
        this._renderer.stage.hitArea = new PIXI.Rectangle(0, 0, 980, 725);
        this._renderer.stage.mousedown = (e) => {
            this._controller.onMouseDown(e);
            let pos = { x: e.data.originalEvent.layerX, y: e.data.originalEvent.layerY };
            if (this._terrain) {
                pos = this._terrain.getContainer().toLocal(pos);
            }
            e.data.posInTerrain = pos;
            console.log(e.data.originalEvent.layerX, e.data.originalEvent.layerY, pos);
        };

        return this;
    }

    addTerrain(terrain) {

        this._terrain = terrain;

        this._renderer.stage.addChild(this._terrain.getContainer());

        return this;
    }

    addActor(actor) {
        if (this._terrain != null) {
            this._terrain.addActor(actor);
        } else {
            let ID = ++this._size;

            actor.setID(ID);

            this._stages[ID] = actor;

            this._renderer.stage.addChild(this._stages[ID].getSprite());
        }    
        return this;
    }

    clearActors() {
        this._size = 0;
        for (let actorID in this._stages) {

            this._renderer.stage.removeChild(this._stages[actorID].getSprite());
            this._stages[actorID] = null;
            delete this._stages[actorID];
        }
        return this;
    }

    render(delta) {
        for (let actorID in this._stages) {
            this._stages[actorID].render(delta);
        }
        if (this._terrain != null) this._terrain.render(delta);
        return this;
    }
}