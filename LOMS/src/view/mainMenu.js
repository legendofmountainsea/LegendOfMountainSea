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

        let loge = new Pattern({
            name: S_assetData.LOGO.NAME,
            path: S_assetData.LOGO.PATH,
            position: { x: 200, y: 200 }
        });

        loge.bindRender((sprite, delta) => {
            sprite.rotation += (0.01 * delta);
        });

        // let houyi = new Character({
        //     name: S_assetData.HOUYI_STAND.NAME,
        //     path: S_assetData.HOUYI_STAND.PATH,
        //     isSpriteSheet:true,
        //     position: { x: 300, y: 400 }
        // });

        this.props.renderer.addActor(logo);

        //this.props.renderer.addActor(houyi);
    }
}