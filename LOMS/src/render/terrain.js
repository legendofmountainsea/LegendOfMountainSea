import Element from './element';
import Hexagon from './hexagon';

export default class Terrain extends Element {
    //TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/40
    constructor(props) {
    	super(props);
        this._noAsset = !props.assetData;
        this._container = null;
        this._assetData = props.assetData;
    }

    isNoAsset() {
        return this._noAsset;
    }

    initResources(resources) {
        this._container = new PIXI.Container();
        this._container.x = 0;
        this._container.y = 0;
        const terrainResource = resources[this._assetData.DATA.NAME];
        const {height, width} = terrainResource.texture;

        for (let index = 0; index < 20; ++index) {
            for (let columnIndex = 0; columnIndex < 20; ++columnIndex) {

                let hexagon = new Hexagon({assetData: this._assetData}).initResources(resources).setDimensions({height, width});

                hexagon.setPosition({
                    x: index,
                    y: columnIndex,
                });

                this._container.addChild(hexagon.getElement());
            }
        }
        return this;
    }
	
	getElement() {
        return this._container;
    }
	
    tick(delta) {

    }

    onRender(delta) {

    }

    render(delta) {
        this.tick(delta);
        this.onRender(delta);
    }
	
	dispose(){
		this._container.destroy({children:true, texture:true, baseTexture:true});
		this._container = null;
	}
}