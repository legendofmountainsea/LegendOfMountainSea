//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/67

import Store from '../module/store';

let content = null;
export default class Localization {
	static getCurrentLanguage(){
		return Store.getConfig().language;
	}
	
	static getLanguageContent(){
		if(!content){
		
		}
	}
	
	static initContent(){
		
	}
}