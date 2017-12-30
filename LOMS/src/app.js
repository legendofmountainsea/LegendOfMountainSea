import 'pixi.js';

import LOMSRenderer from './render/lomsRenderer';
import MainMenu from './view/mainMenu';

export default class LOMS {
	constructor() {
		this._renderer = null;
	}
	
	beginGame() {
		setTimeout(() => {
			this._renderer = new LOMSRenderer;
			this._renderer.renderScene(new MainMenu);
			this._renderer.render();
		}, 1000);
	}
}
