//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/26
export default class Store {
	
	clearConfig(){
	
	}
	
	static readConfig(){
		if(!fileSystem){
			return;
		}
		
		fileSystem.readFile('my-settings-file.json', function (err, config) {
			if (err) {
				console.error(err);
				return;
			}
			console.warn('config '+ config);
		});
	}
	
	writeConfig(){
	
	}
	
	addConfig(){
	
	}
	
	removeConfig(){
	
	}
}