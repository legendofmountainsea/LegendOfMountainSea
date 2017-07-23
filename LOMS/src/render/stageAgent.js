import Actor from './actor';
import Controller from '../control/controller';
export default class StageAgent {
    constructor(engineProps) {
        this._engineProps = engineProps;
        this._stages = {};
        this._size = 0;
        this._controller = null;
    }

    initController(){
        this._engineProps.stage.interactive = true;
        this._controller = new Controller();
        this._engineProps.stage.hitArea = new PIXI.Rectangle(0, 0, 990, 768);
        this._engineProps.stage.mousedown = (e) => {
            console.log(e)
        };
    }

    addActor(actor){
        let ID = ++this._size;

        actor.setID(ID);

        this._stages[ID] = actor;

        this._engineProps.stage.addChild(this._stages[ID].getSprite());
    }

    render(delta) {
        for(let actorID in this._stages){
            this._stages[actorID].render(delta);
        }
    }
}