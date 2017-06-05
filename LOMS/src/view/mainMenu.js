export default class MainMenu {
    constructor(props){
        this.props = props;

        this.props.renderer.initRenderer();
    }

    render(){

        this.props.renderer.addResource('logo', './LOMS.png');
    }
}