import Actor from './actor';
export default class StageAgent {
    constructor(engineProps){
        this._engineProps = engineProps;
        this._stages = {};
        this._size = 0;
    }

    addElements(...element) {
        for(let index = 0; index < element; ++index){
            this._stages[this._size++] = element[index];
        }
    };

    removeElements(...element){

    }

    //use lomsRenderer render function to call this
    render(delta){

    }
}