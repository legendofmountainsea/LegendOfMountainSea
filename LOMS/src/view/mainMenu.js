import S_assetData from '../static/assetData';

import Actor from '../render/actor';

export default class MainMenu {
    constructor(props) {
        this.props = props;

        this.props.renderer.init(() => {
            this.render()
        });
    }

    render() {

        let logo2Actor = new Actor({
            name: S_assetData.LOGO.NAME,
            path: S_assetData.LOGO.PATH,
            position: { x: 100, y: 200 }
        });

        logo2Actor.bindRender((sprite, delta) => {
            sprite.rotation += (0.01 * delta);
        });

        let logoActor = new Actor({
            name: S_assetData.LOGO.NAME,
            path: S_assetData.LOGO.PATH,
            position: { x: 300, y: 400 }
        });

        logoActor.bindRender((sprite, delta) => {
            sprite.rotation += (0.01 * delta);
        });

        this.props.renderer.addActor(logoActor);

        this.props.renderer.addActor(logo2Actor);
    }
}