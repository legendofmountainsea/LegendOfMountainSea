//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/26
import {EXECUTE_IN_CLIENT} from '../util/envUtil';

let config = null;
export default class Store {
	
	static _getInitConfig() {
		return {language: systemLanguage};
	}
	
	static _getConfigPath(){
		return pathHelper.join(appRootPath, 'lomsConfig.json');
	}
	
	static _initConfig(initConfigJson) {
		config = initConfigJson;
		fileSystem.writeFile(Store._getConfigPath(), JSON.stringify(config), (error) => {
			if (error) {
				console.error(error);
			}
		});
	}
	
	static getConfig() {
		if (!config) {
			Store._initConfig(Store._getInitConfig());
			return Store._getInitConfig();
		}
		return config;
	}
	
	static readConfig() {
		EXECUTE_IN_CLIENT(() => {
			if (!config) {
				Store._initConfig(Store._getInitConfig());
				return;
			}
			fileSystem.readFile(Store._getConfigPath(), (error, configStr) => {
				if (error) {
					console.error(error);
					return;
				}
				config = JSON.parse(configStr);
			});
		});
	}
	
	static addConfig(newConfig) {
		EXECUTE_IN_CLIENT(() => {
			if (!config) {
				Store._initConfig({
					...Store._getInitConfig(),
					...newConfig,
				});
				return;
			}
			
			config = {
				...config,
				...newConfig,
			};
			
			fileSystem.writeFile(Store._getConfigPath(), JSON.stringify(config), (error) => {
				if (error) {
					console.error(error);
				}
			});
		});
	}
	
	static removeConfig() {
	
	}
}