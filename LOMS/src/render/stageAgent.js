import Actor from './actor';
export default class StageAgent {
    constructor(engineProps){
        this._engineProps = engineProps;
        this._stages = {};
        this._idCounter = 0;
        this._actor = new Actor().render();
    }

    addElements(...element) {
        for(let index = 0; index < element; ++index){
            this._stages[this._idCounter++] = element[index];
        }
    };

    removeElements(...element){

    }

    //use lomsRenderer render function to call this
    render(delta){

    }
}