import {EXECUTE_IN_CLIENT, EXECUTE_IN_CLIENT_WITH_RETURN} from '../util/envUtil';

export default class Window {
	
	static enterFullscreen() {
		EXECUTE_IN_CLIENT(() => {
			nwWinGUI.maximize();
			nwWinGUI.enterFullscreen();
		});
	}
	
	static getDimension() {
		
		try {
			return EXECUTE_IN_CLIENT_WITH_RETURN(() => {
				return {
					width: parseInt(nwWinGUI.width),
					height: parseInt(nwWinGUI.height),
				};
			});
		} catch (e) {
			console.error(e);
			return {
				width: 800,
				height: 600,
			};
		}
	}
	
	static close() {
		EXECUTE_IN_CLIENT(() => {
			nwWinGUI.close();
		});
	}
}