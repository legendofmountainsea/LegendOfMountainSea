import Actor from '../render/actor';

export default class MainMenu {
    constructor(props){
        this.props = props;
        this.props.renderer.initRenderer();
    }

    render(){
        let logoActor = new Actor({name:'logo',path:'./LOMS.png'});

        logoActor.setInitPosition({x:300,y:400});
 
        this.props.renderer.addActor(logoActor);
    }
}