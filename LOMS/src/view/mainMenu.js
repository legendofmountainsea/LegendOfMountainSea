import S_mainMenuAsset from '../static/mainMenuAsset';

import Scene from '../scene/scene';

import Pattern from '../render/pattern';
import UIText from '../render/uiText';
import Style from '../static/textStyle';
import WorldScene from '../scene/worldScene';
import Localization from '../i18n/localization';
import {EXECUTE_IN_CLIENT} from '../util/envUtil';

export default class MainMenu extends Scene {
	constructor(props) {
		super(props);
		this._assetsData = [S_mainMenuAsset];
		this._onFinish = this.onFinish.bind(this);
		this._backGroundMusic = null;
	}
	
	onFinish() {
		let languageContent = null;
		
		EXECUTE_IN_CLIENT(()=>{
			languageContent = Localization.getLanguageContent();
		});
		
		this._backGroundMusic = new Audio('../../assets/sound/Angelic_Happiness.mp3');
		this._backGroundMusic.loop = true;
		this._backGroundMusic.play();
		
		let logo = new Pattern({
			assetData: S_mainMenuAsset.LOGO,
			position: {x: 200, y: 200},
		});
		
		logo.bindRender((sprite, delta) => {
			sprite.rotation += (0.01 * delta);
		});
		
		let newGameText = new UIText({
			string: languageContent? languageContent.newGame : 'New Game',
			position: {x: 400, y: 400},
			style: Style.MAIN_MENU,
			onClick: (e) => {
				this.dispose();
				const worldScene = new WorldScene;
				this._renderer.renderScene(worldScene);
				this._backGroundMusic.pause();
			},
		});
		
		let loadGameText = new UIText({
			string: languageContent? languageContent.loadGame : 'Load Game',
			position: {x: 400, y: 450},
			style: Style.MAIN_MENU,
			onClick: (e) => {
				//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/26
			},
		});
		
		let quitGameText = new UIText({
			string: languageContent? languageContent.quit : 'Quit',
			position: {x: 400, y: 500},
			style: Style.MAIN_MENU,
			onClick: (e) => {
				this._renderer.close();
			},
		});
		
		this._renderer.addUI(logo);
		
		this._renderer.addUI(newGameText);
		this._renderer.addUI(loadGameText);
		this._renderer.addUI(quitGameText);
		
		EXECUTE_IN_CLIENT(()=>{
			let languageInfoText = new UIText({
				string: `language: ${Localization.getCurrentLanguage()}`,
			});
			this._renderer.addUI(languageInfoText);
		});
		
		return this;
	}
	
	dispose() {
		this._renderer.clearStage();
		return this;
	}
}