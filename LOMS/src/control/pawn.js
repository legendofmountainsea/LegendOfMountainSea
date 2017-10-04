export default class Pawn {
    constructor(props) {
        this._character = props.character;
    }

    getCharacter(){
        return this._character;
    }

    onMouseDown(e) {
        const { layerX, layerY } = e.data.originalEvent;
        if (e.data.posInTerrain != null) {
            this._character.moveTo(e.data.posInTerrain);
        } else {
            this._character.moveTo({ x: layerX, y: layerY });
        }
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