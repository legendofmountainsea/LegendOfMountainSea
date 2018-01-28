//Experimemt
let terrainChainValue = {x:0,y:0};

export default class TerrainChain {
	static getValue(){
		return terrainChainValue;
	}
	
	static setValue(value){
		terrainChainValue.x += value.x;
		terrainChainValue.y += value.y;
	}
}