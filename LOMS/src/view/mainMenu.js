import S_mainMenuAsset from '../static/mainMenuAsset';

import Scene from '../scene/scene';

import Pattern from '../render/pattern';
import UIText from '../render/uiText';
import Style from '../static/textStyle';
import WorldScene from '../scene/worldScene';

export default class MainMenu extends Scene {
	constructor(props) {
		super(props);
		this._assetsData = [S_mainMenuAsset];
		this._onFinish = this.onFinish.bind(this);
		this._backGroundMusic = null;
	}
	
	onFinish() {
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
			string: 'New Game',
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
			string: 'Load Game',
			position: {x: 400, y: 450},
			style: Style.MAIN_MENU,
			onClick: (e) => {
				//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/26
			},
		});
		
		let quitGameText = new UIText({
			string: 'Quit',
			position: {x: 400, y: 500},
			style: Style.MAIN_MENU,
			onClick: (e) => {
				winGUI ? winGUI.close() : window.close();
			},
		});
		
		this._renderer.addActor(logo);
		
		this._renderer.addActor(newGameText);
		this._renderer.addActor(loadGameText);
		this._renderer.addActor(quitGameText);
		
		return this;
	}
	
	dispose() {
		this._renderer.clearStage();
		return this;
	}
}