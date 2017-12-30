//set NW.js client window size
var winGUI = require('nw.gui').Window.get();

if (winGUI !== 'undefined') {
	winGUI.maximize();
	
	setTimeout(function () {
		winGUI.enterFullscreen();
	}, 1000);
}