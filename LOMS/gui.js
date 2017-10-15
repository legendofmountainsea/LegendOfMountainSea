//set NW.js client window size
var wingui = require('nw.gui').Window.get();

if (wingui !== 'undefined') {
    wingui.maximize();
    wingui.setResizable(false);
}