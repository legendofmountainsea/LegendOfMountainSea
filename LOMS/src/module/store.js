//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/26
import {EXECUTE_IN_CLIENT} from '../util/envUtil';

const configPath = pathHelper.join(appRootPath, 'lomsConfig.json');
let config = null;
const initConfig = {
	language: systemLanguage,
};

export default class Store {
	
	static _initConfig(initConfigJson) {
		config = initConfigJson;
		fileSystem.writeFile(configPath, JSON.stringify(config), (error) => {
			if (error) {
				console.error(error);
			}
		});
	}
	
	static getConfig() {
		if (!config) {
			Store._initConfig(initConfig);
			return initConfig;
		}
		return config;
	}
	
	static readConfig() {
		EXECUTE_IN_CLIENT(() => {
			if (!config) {
				Store._initConfig();
				return;
			}
			fileSystem.readFile(configPath, (error, configStr) => {
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
					...initConfig,
					...newConfig,
				});
				return;
			}
			
			config = {
				...config,
				...newConfig,
			};
			
			fileSystem.writeFile(configPath, JSON.stringify(config), (error) => {
				if (error) {
					console.error(error);
				}
			});
		});
	}
	
	static removeConfig() {
	
	}
}