import S_assetData from '../static/assetData';

import Pattern from '../render/pattern';
import Character from '../render/Character';
import Pawn from '../control/pawn';

export default class MainMenu {
    constructor(props) {
        this.props = props;

        this.props.renderer.init({
            controller: props.controller,
            onFinish:() => {
                this.render();
            }
        });
    }

    render() {

        let logo = new Pattern({
            assetData: S_assetData.LOGO,
            position: { x: 200, y: 200 },
        });

        logo.bindRender((sprite, delta) => {
            sprite.rotation += (0.01 * delta);
        });

        let houyi = new Character({
            assetData: S_assetData.HOUYI,
            position: { x: 300, y: 400 },
        });

        const controller = this.props.renderer.getController();
        controller.possess(new Pawn({character:houyi}));

        this.props.renderer.addActor(houyi);
        this.props.renderer.addActor(logo);
    }
}