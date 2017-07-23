export default class Pawn {
    constructor(props) {
        this._character = props.character;
    }

    onMouseDown(e) {
        const { layerX, layerY } = e.data.originalEvent;
        this._character.moveTo({ x: layerX, y: layerY });
    }
};