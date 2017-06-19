import Actor from './actor';
export default class StageAgent {
    constructor(engineProps) {
        this._engineProps = engineProps;
        this._stages = {};
        this._size = 0;
    }

    addActor(actor){
        let ID = ++this._size;

        actor.setID(ID);

        this._stages[ID] = actor;

        this._engineProps.stage.addChild(this._stages[ID].getSprite());
    }

    removeActors(...resouses) {

    }

    //use lomsRenderer render function to call this
    render(delta) {
        for(let actorID in this._stages){
            this._stages[actorID].render(delta);
        }
    }
}