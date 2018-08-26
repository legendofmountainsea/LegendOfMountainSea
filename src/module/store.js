import {EXECUTE_IN_CLIENT, EXECUTE_IN_CLIENT_WITH_RETURN} from '../util/envUtil';
import RandomSeed from '../core/randomSeed';

let config = null;
export default class Store {
	
	static _getInitConfig() {
		return {language: systemLanguage, seed: new RandomSeed().random()};
	}
	
	static _getConfigPath() {
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
			return Store.readConfig();
		}
		
		return config;
	}
	
	static readConfig() {
		try {
			return EXECUTE_IN_CLIENT_WITH_RETURN(() => {
				if (!fileSystem.existsSync(Store._getConfigPath())) {
					Store._initConfig(Store._getInitConfig());
					return config;
				}
				const configStr = fileSystem.readFileSync(Store._getConfigPath());
				
				config = JSON.parse(configStr);
				
				return config;
			});
		}
		catch (e) {
			console.error(e);
			return Store._getInitConfig();
		}
	}
	
	static changeConfig(newConfig) {
		EXECUTE_IN_CLIENT(() => {
			config = newConfig;
			fileSystem.writeFile(Store._getConfigPath(), JSON.stringify(config), (error) => {
				if (error) {
					console.error(error);
				}
			});
		});
	}
	
	static addConfig(newConfig) {
		EXECUTE_IN_CLIENT(() => {
			if (!config) {
				config = Store.readConfig();
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