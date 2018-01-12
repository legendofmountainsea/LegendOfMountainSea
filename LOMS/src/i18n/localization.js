//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/67

import Store from '../module/store';

export default class Localization {
	static getCurrentLanguage(){
		return Store.getConfig().language;
	}
}