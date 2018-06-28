import $ from 'jquery';
import S_gameMenuAsset from '../static/gameMenuAsset';
import S_worldAsset from '../static/heroCharacter/heroAsset';
import S_worldTerrainAsset from '../static/terrain/worldTerrainAsset';
import T_modalTemplate from '../static/interface/modalTemplate.html';

import Scene from './scene';
import Pawn from '../control/pawn';
import Character from '../render/character';
import Pattern from '../render/pattern';
import Terrain from '../render/terrain';
import Coordinates from '../core/coordinates';

export default class WorldScene extends Scene {
	constructor(props) {
		super(props);
		this._assetsData = [S_gameMenuAsset, S_worldAsset, S_worldTerrainAsset];
		this._onFinish = this.onFinish.bind(this);
	}
	
	onFinish() {
		let music = new Audio('./assets/sound/Choose_Your_Path.mp3');
		music.loop = true;
		music.play();

		let worldTerrain = new Terrain({
			assetData: S_worldTerrainAsset.HEXAGON,
			coordinates: new Coordinates(0,0),
		});

		
		let systemMenuIcon = new Pattern({
			assetData: S_gameMenuAsset.SYSTEM_ICON,
			position: new Coordinates(20,20),
			onClick: (e) => {
				const systemModal = T_modalTemplate({content:'system'});
				$('#GUIContainer').html(systemModal);
				
				$('#modalCenter').modal();
			},
		});
		
		this._renderer.addUI(systemMenuIcon);
		
		let houyi = new Character({
			assetData: S_worldAsset.HOUYI,
			position: new Coordinates(100,400),
		});

		houyi.setNavigator(worldTerrain.getNavigator());
		
		const controller = this._renderer.getController();
		controller.possess(new Pawn({character: houyi}));
		
		this._renderer.addActor(houyi);

		this._renderer.addTerrain(worldTerrain);
	}
}