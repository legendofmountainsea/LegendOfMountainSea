import Actor from '../render/actor';

export default class MainMenu {
    constructor(props){
        this.props = props;
        this.props.renderer.initRenderer();
    }

    render(){
        let logoActor = new Actor({
            name:'logo',
            path:'./LOMS.png',
            position: {x:300,y:400}
        });

        logoActor.bindRender((sprite, delta)=>{
            sprite.rotation += (0.01 * delta);
        });
 
        this.props.renderer.addActor(logoActor);
    }
}