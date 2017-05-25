export default class MainMenu {
    constructor(props){
        this.props = props;

        this.props.renderer.initRenderer();
    }

    render(){

        this.props.renderer.addResource('logo', './LOMS.png', (logo) => {

            let sprite = new PIXI.Sprite(logo.texture);

            sprite.position.x = 400;
            sprite.position.y = 300;

            this.props.renderer.loadSprite(sprite);

        });
    }
}