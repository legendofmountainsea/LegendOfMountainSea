import S_assetData from '../static/assetData';

import Pattern from '../render/pattern';
import Character from '../render/Character';

export default class MainMenu {
    constructor(props) {
        this.props = props;

        this.props.renderer.init(() => {
            this.render()
        });
    }

    render() {

        let logo = new Pattern({
            assetData: S_assetData.LOGO,
            position: { x: 200, y: 200 }
        });

        logo.bindRender((sprite, delta) => {
            sprite.rotation += (0.01 * delta);
        });

        // let houyi = new Character({
        //     assetData: S_assetData.HOUYI,
        //     position: { x: 300, y: 400 }
        // });

        this.props.renderer.addActor(logo);

        // this.props.renderer.addActor(houyi);
    }
}