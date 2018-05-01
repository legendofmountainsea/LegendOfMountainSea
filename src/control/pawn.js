/**
 * a class for pawn in game that player could control
 */
class Pawn {
	/**
	 * create a pawn in game
	 * @param props
	 */
	constructor(props) {
		props = props || {};
		this._character = props.character;
	}
	
	/**
	 * get the character instance
	 * @returns {Character}
	 */
	getCharacter() {
		return this._character;
	}
	
	onMouseDown(e) {
		const {layerX, layerY} = e;
		this._character.moveTo({x: layerX, y: layerY});
	}
	
	onMouseUp(e) {
		const {layerX, layerY} = e;
		this._character.moveTo({x: layerX, y: layerY});
	}
	
	onPressKeyA(e) {
		this._character.playAttack();
	}
	
	onPressKeyB(e) {
		this._character.playBattle();
	}
	
	onPressKeyD(e) {
		this._character.playNearDeath();
	}
	
	onPressKeyU(e) {
		this._character.playUltimate();
	}
}

 export default Pawn;