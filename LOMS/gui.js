//set NW.js client window size
//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/31
var wingui = require('nw.gui').Window.get();

if (wingui !== 'undefined') {
    wingui.setMinimumSize(1024, 768);
    wingui.setResizable(false);
    wingui.moveTo(0, 0);
}