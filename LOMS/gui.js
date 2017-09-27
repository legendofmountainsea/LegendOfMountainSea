//set NW.js client window size
var wingui = require('nw.gui').Window.get();

if (wingui !== 'undefined') {
    wingui.setMinimumSize(1024, 768);
    wingui.setResizable(false);
    wingui.moveTo(0, 0);
}