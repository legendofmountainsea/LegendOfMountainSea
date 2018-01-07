export default class Window {
	constructor(props){
		this._winGUI = winGUI ? winGUI : null;
	}
	
	getDimension(){
		
		if(!this._winGUI){
			return {
				width: 1600,
				height: 800,
			};
		}
	
		return {
			width: parseInt(this._winGUI.width * 0.98),
			height: parseInt(this._winGUI.height * 0.96),
		};
	}
	
	close(){
		if(this._winGUI){
			this._winGUI.close();
		}
		else {
			window.close();
		}
	}
}