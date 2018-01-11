//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/26
import {EXECUTE_IN_CLIENT} from '../util/envUtil';
export default class Store {
	
	clearConfig(){
	
	}
	
	static readConfig(){
		EXECUTE_IN_CLIENT(()=>{
			fileSystem.readFile('my-settings-file.json', function (err, config) {
				if (err) {
					console.error(err);
					return;
				}
				console.warn('config '+ config);
			});
		});
	}
	
	writeConfig(){
	
	}
	
	addConfig(){
	
	}
	
	removeConfig(){
	
	}
}