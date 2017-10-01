export default class Pawn {
    constructor(props) {
        this._character = props.character;
    }

    getCharacter(){
        return this._character;
    }

    onMouseDown(e) {
        const { layerX, layerY } = e.data.originalEvent;
        this._character.moveTo({ x: layerX, y: layerY });
    }

    onPressKeyA(e){
        this._character.playAttack();
    }

    onPressKeyB(e){
        this._character.playBattle();
    }

    onPressKeyD(e){
        this._character.playNearDeath();
    }
};