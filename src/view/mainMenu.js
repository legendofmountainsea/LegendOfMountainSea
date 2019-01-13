// @flow
import $ from 'jquery';
import S_mainMenuAsset from '../static/mainMenuAsset';
import T_modalTemplate from '../static/interface/modalTemplate.html';
import T_contentListContent from '../static/interface/systemModal/contentListContent.html';
import T_contentListContainer from '../static/interface/systemModal/contentListContainer.html';

import Scene from '../scene/scene';
import Coordinates from '../core/coordinates';

import Pattern from '../render/pattern';
import UIText from '../render/uiText';
import Style from '../static/textStyle';
import WorldScene from '../scene/worldScene';
import Localization from '../i18n/localization';
import { EXECUTE_IN_CLIENT } from '../util/envUtil';
import Socket from '../module/socket';
import type { AnimationAssetType, NoneAnimationAssetType } from '../static/type/assetDataType';

type MainMenuPropsType = {
};

class MainMenu extends Scene {

	_backGroundMusic: Audio;
	_assetsData: Array<AnimationAssetType | NoneAnimationAssetType>
	_onFinish: Function;

	constructor(props: MainMenuPropsType) {
		super(props);
		this._assetsData = [S_mainMenuAsset];
		this._onFinish = this.onFinish.bind(this);
	}

	onFinish() {
		let languageContent = null;

		EXECUTE_IN_CLIENT(() => {
			languageContent = Localization.getLanguageContent().mainMenu;
		});

		this._backGroundMusic = new Audio(
			'./assets/sound/Angelic_Happiness.mp3',
		);
		this._backGroundMusic.loop = true;
		this._backGroundMusic.play();

		let logo = new Pattern({
			assetData: S_mainMenuAsset.LOGO,
			position: new Coordinates(200, 200),
		});

		logo.bindRender((sprite: PIXI.Sprite, delta: number) => {
			sprite.rotation += 0.01 * delta;
		});

		let newGameText = new UIText({
			string: languageContent ? languageContent.newGame : 'New Game',
			position: new Coordinates(400, 400),
			style: Style.MAIN_MENU,
			onClick: (e) => {
				this.dispose();
				const worldScene = new WorldScene({});
				this._renderer.renderScene(worldScene);
				this._backGroundMusic.pause();
				this._backGroundMusic = null;

				EXECUTE_IN_CLIENT(() => {
					const server = Socket.getServer();
					if(!server.isStart()){
						server.start();
					}
				});
			},
		});

		let listContents = () => {
			let content = '';
			for (let index = 0; index < 2; index++) {
				content += T_contentListContent({ itemName: index });
			}

			return content;
		};

		let loadGameText = new UIText({
			string: languageContent ? languageContent.loadGame : 'Load Game',
			position: new Coordinates(400, 450),
			style: Style.MAIN_MENU,
			onClick: (e) => {
				const loadGameModal = T_modalTemplate({
					titleName: languageContent ? languageContent.loadGame: '',
					okButtonName: languageContent ? languageContent.loadGame: '',
					closeButtonName: languageContent ? languageContent.quit: '',
					content: T_contentListContainer({
						listContent: listContents(),
					}),
				});
				$('#GUIContainer').html(loadGameModal);

				$('#modalCenter').modal();
			},
		});

		let quitGameText = new UIText({
			string: languageContent ? languageContent.quit : 'Quit',
			position: new Coordinates(400, 500),
			style: Style.MAIN_MENU,
			onClick: (e) => {
				this._renderer.close();
			},
		});

		this._renderer.addUI(logo);

		this._renderer.addUI(newGameText);
		this._renderer.addUI(loadGameText);
		this._renderer.addUI(quitGameText);

		EXECUTE_IN_CLIENT(() => {
			let languageInfoText = new UIText({
				string: `language: ${Localization.getCurrentLanguage()}`,
				position: new Coordinates(0, 0),
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

export default MainMenu;