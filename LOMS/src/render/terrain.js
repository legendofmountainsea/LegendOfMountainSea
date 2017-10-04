import UIText from '../render/uiText';

export default class Terrain {
    //TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/40

    /********************************
     * solution 1: hexagon
     * 
     *  □ □ □ □ □ □ □ □
     *   ■ ■ ■ ■ ■ ■ ■
     *  □ □ □ □ □ □ □ □
     *   ■ ■ ■ ■ ■ ■ ■
     *  □ □ □ □ □ □ □ □
     * 
     * coordinate: col, row
     * measurement
     * container:
     * points:  center:     (1.732 * measurement * col, 2 * measurement * row),
     *          top:        (center.x, center.y - measurement), 
     *          topLeft:    (center.x - 0.866 * measurement, center.y - 0.5 * measurement), 
     *          topRight:   (center.x + 0.866 * measurement, center.y - 0.5 * measurement),
     *          bottom:     (center.x, center.y + measurement),
     *          bottomLeft: (center.x - 0.866 * measurement, center.y + 0.5 * measurement),
     *          bottomRight:(center.x + 0.866 * measurement, center.y + 0.5 * measurement),
     * 
     * adjacent terrian:    (col - 1, row - 1), (col + 1, row - 1), 
     *                  (col - 1, row),     <self>,     (col + 1, row), 
     *                      (col - 1, row + 1), (col + 1, row + 1), 
     * dimension:   maxCol = stage.width / (1.732 * measurement) + 1
     *              maxRow = stage.height / (2 * measurement) + 1
     * 
     *********************************/
    constructor(props){
        this._noAsset = props.noAsset ? props.noAsset : false;
        this._scale = props.scale ? props.scale : { maxCol: 15, maxRow: 15 };
        this._measurement = props.measurement ? props.measurement : 100;
        this._container = null;
        this._terrains = {};
        this._size = 0;
    }

    isNoAsset(){
        return this._noAsset;
    }

    initResources(resources) {
        this._container = new PIXI.projection.Container2d();
        this._container.position.set(490, 725);
        this._container.proj.setAxisY({x: 0, y: 1450}, -0.5);
        this._hexagonTexture = new PIXI.Texture.fromImage('../../assets/hexagon.png');

        for (let c = 0; c < this._scale.maxCol; c++) {
            for (let r = 0; r < this._scale.maxRow; r++) {
                this.drawAHexagon(c, r);
            }
        }
    }

    drawAHexagon(c, r) {
        let hexagonCell = new PIXI.projection.Sprite2d(this._hexagonTexture);
        hexagonCell.anchor.set(0.5, 1.0);
        hexagonCell.width = this._measurement * Math.sqrt(3);
        hexagonCell.height = this._measurement * 2;
        hexagonCell.position.x = (hexagonCell.width - 1) * c - 980;
        if (r % 2 != 0) hexagonCell.position.x += hexagonCell.width / 2;
        hexagonCell.position.y = -(hexagonCell.height - 1) * r * 0.75 + 400;
        this._container.addChild(hexagonCell);
    }

    getContainer() {
        return this._container;
    }

    getCoordinate(position) {

    }

    addActor(actor) {
        let ID = ++this._size;

        actor.setID(ID);

        this._terrains[ID] = actor;
        this._terrains[ID].getSprite().convertTo2d();
        //NOTE: Charactor may be inversed vertically after setting AFFINE.AXIS_X
        this._terrains[ID].getSprite().proj.affine = PIXI.projection.AFFINE.AXIS_X;
        this._container.addChild(this._terrains[ID].getSprite());

        return this;
    }

    clearActors() {
        this._size = 0;
        for (let actorID in this._terrains) {

            this._container.removeChild(this._terrains[actorID].getSprite());
            this._terrains[actorID] = null;
            delete this._terrains[actorID];
        }
        return this;
    }

    tick(delta){

    }

    onRender(delta){
        for (let actorID in this._terrains) {
            this._terrains[actorID].render(delta);
        }
    }

    render(delta){
        this.tick(delta);
        this.onRender(delta);
    }
}