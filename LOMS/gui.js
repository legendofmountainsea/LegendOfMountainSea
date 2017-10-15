//set NW.js client window size
var winGUI = require('nw.gui').Window.get();

if (winGUI !== 'undefined') {
    winGUI.maximize();
    winGUI.setResizable(false);
}