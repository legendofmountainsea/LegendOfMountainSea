import Actor from './actor';
export default class StageAgent {
    constructor(engineProps) {
        this._engineProps = engineProps;
        this._stages = {};
        this._size = 0;
    }

    addActors(...resouces) {

        for (let index = 0; index < resouces.length; ++index) {

            let ID = ++this._size;

            let actor = new Actor({
                ID: this._size,
                resouce: resouces[index]
            });

            this._stages[ID] = actor;

            this._engineProps.stage.addChild(this._stages[ID].getSprite());
        }
    };

    removeActors(...resouses) {

    }

    //use lomsRenderer render function to call this
    render(delta) {
        
    }
}