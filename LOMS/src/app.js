import 'pixi.js';
import 'bootstrap';

import LOMSRenderer from './render/lomsRenderer';
import MainMenu from './view/mainMenu';
import Window from './module/window';

export default class LOMS {
	constructor() {
		this._renderer = null;
	}
	
	beginGame() {
		Window.enterFullscreen();
		
		setTimeout(() => {
			this._renderer = new LOMSRenderer;
			this._renderer.renderScene(new MainMenu);
			this._renderer.render();
		}, 1000);
	}
}
