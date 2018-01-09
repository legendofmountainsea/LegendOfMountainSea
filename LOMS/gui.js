//set NW.js client window size
var winGUI = nw.Window.get();

winGUI.maximize();

setTimeout(function () {
	winGUI.enterFullscreen();
}, 1000);
