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
					width: parseInt(nwWinGUI.width * 0.98),
					height: parseInt(nwWinGUI.height * 0.96),
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