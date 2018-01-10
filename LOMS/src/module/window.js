import {EXECUTE_IN_CLIENT, EXECUTE_IN_CLIENT_WITH_RETURN} from "./envUtil";

export default class Window {

	static enterFullscreen(){
		EXECUTE_IN_CLIENT(()=>{
			nwWinGUI.maximize();
			nwWinGUI.enterFullscreen();
		});
	}
	
	static getDimension(){
		
		const dimension = EXECUTE_IN_CLIENT_WITH_RETURN(()=>{
			return {
				width: parseInt(nwWinGUI.width * 0.98),
				height: parseInt(nwWinGUI.height * 0.96),
			};
		});
		
		return dimension? dimension : {
			width: 1600,
			height: 800,
		};
	}
	
	static close(){
		if(nwWinGUI){
			nwWinGUI.close();
		}
		else {
			window.close();
		}
	}
}