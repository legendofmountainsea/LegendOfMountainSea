export default resourcePool = {};

export function getAllAssetsData(){
    return {
        LOGO:{
            NAME: 'logo',
            PATH: './LOMS.png',
        }
    }
}

export function setResourcesToPool(resources){
    resourcePool = resources;
}