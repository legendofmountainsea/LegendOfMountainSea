export default class LayerAgent {
    constructor(props) {
        this._stage = props.stage;
        this._layer = {};
        this._elements = {};
        this._size = 0;
    }

    init() {

    }

    addElement(element, index = 0) {
        let ID = ++this._size;

        element.setID(ID);

        this._elements[ID] = element;

        this._addToLayer(element, index);

        const result = this._getTopElementInLayer(index);

        const childIndex = this._stage.getChildIndex(result);

        this._stage.addChildAt(this._elements[ID].getSprite(), childIndex);

        return this;
    }

    _addToLayer(element, index) {
        if (!this._layer[index]) {
            this._layer[index] = [];
        }

        this._layer[index].push(element);
    }

    _getTopElementInLayer(index) {

        if(0 === index){
            return index;
        }

        if(!this._layer[index]){
            return this._getTopElementInLayer(index - 1);
        }
        return this._layer[index][0];
    }


    render(tick) {

    }
}