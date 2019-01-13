// @flow
import $ from 'jquery';
import S_gameMenuAsset from '../static/gameMenuAsset';
import S_worldAsset from '../static/heroCharacter/heroAsset';
import S_worldTerrainAsset from '../static/terrain/worldTerrainAsset';
import T_modalTemplate from '../static/interface/modalTemplate.html';
import T_chatModalContainer from '../static/interface/chatModal/chatModalContainer.html';
import T_chatContentContainer from '../static/interface/chatModal/chatContentContainer.html';

import Scene from './scene';
import Pawn from '../control/pawn';
import Character from '../render/character';
import Pattern from '../render/pattern';
import Terrain from '../render/terrain';
import Coordinates from '../core/coordinates';
import Socket from '../module/socket';
import { EXECUTE_IN_CLIENT } from '../util/envUtil';

type WorldScenePropsType = {

};

class WorldScene extends Scene {

	constructor(props: WorldScenePropsType) {
		super(props);
		this._assetsData = [S_gameMenuAsset, S_worldAsset, S_worldTerrainAsset];
		this._onFinish = this.onFinish.bind(this);

		//TODO: show progress
		EXECUTE_IN_CLIENT(() => {
			const networkClient = Socket.getClient();
			networkClient.connect();
		});
	}

	onFinish() {
		let music = new Audio('./assets/sound/Choose_Your_Path.mp3');
		music.loop = true;
		music.play();

		let worldTerrain = new Terrain({
			assetData: S_worldTerrainAsset.HEXAGON,
			coordinates: new Coordinates(0, 0),
		});

		this._renderer.addTerrain(worldTerrain);

		let systemMenuIcon = new Pattern({
			assetData: S_gameMenuAsset.SYSTEM_ICON,
			position: new Coordinates(20, 20),
			onClick: (e) => {
				const systemModal = T_modalTemplate({ content: 'system' });
				$('#GUIContainer').html(systemModal);

				$('#modalCenter').modal();
			},
		});

		let messageContents = () => {
			let content = '';
			for (let index = 0; index < 1; index++) {
				console.warn(index);
				content += T_chatContentContainer({ message: 'test' });
			}

			return content;
		};

		let speechBubbleIcon = new Pattern({
			assetData: S_gameMenuAsset.SPEECH_BUBBLE_ICON,
			position: new Coordinates(60, 20),
			onClick: (e) => {
				//show chat history

				const chatModal = T_modalTemplate({
					content: T_chatModalContainer({
						chatView: messageContents(),
					}),
				});
				$('#GUIContainer').html(chatModal);

				$('#modalCenter').modal();
			},
		});

		this._renderer.addUI(speechBubbleIcon);
		this._renderer.addUI(systemMenuIcon);

		let houyi = new Character({
			assetData: S_worldAsset.HOUYI,
			position: new Coordinates(1, 1),
		});

		houyi.setNavigator(worldTerrain.getNavigator());

		const controller = this._renderer.getController();
		controller.possess(new Pawn({ character: houyi }));

		this._renderer.addActor(houyi);
	}
}

export default WorldScene;