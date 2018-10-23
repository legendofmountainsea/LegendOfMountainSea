import zhCN from './zh-CN/zh-CN';
import enUS from './en-US/en-US';

import Store from '../module/store';

let content = null;
export default class Localization {
	static getCurrentLanguage(){
		return Store.getConfig().language;
	}
	
	static getLanguageContent(){
		if(!content){
			content = Localization._getInitContent();
		}
		
		return content;
	}
	
	static _getInitContent(){
		const supportLanguages = Localization.getSupportLanguages(),
			currentLanguage = Localization.getCurrentLanguage();
		
		let language = supportLanguages[currentLanguage];
		
		if(!language){
			language = supportLanguages['zh-CN'];
		}
		
		return language.content;
	}
	
	static getSupportLanguages(){
		return {
			'zh-CN': zhCN,
			'en-US': enUS,
		};
	}
}