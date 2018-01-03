//TODO https://github.com/SkyHarp/LegendOfMountainSea/issues/67
var fs = require('fs');
var path = require('path');

const language = window.navigator.language;

class i18n {
    constructor(){
        this._config = language;
    }

    setConfig(config){
        this._config = config;
    }

    getConfig(){
        return this._config;
    }
}

function saveSettings (settings, callback) {
    var file = 'my-settings-file.json';
    var filePath = path.join(nw.App.dataPath, file);
    fs.writeFile(filePath, settings, function (err) {
        if (err) {
            console.info("There was an error attempting to save your data.");
            console.warn(err.message);
            return;
        } else if (callback) {
            callback();
        }
    });
}

var mySettings = {
    "language": "en",
    "theme": "dark"
};

saveSettings(mySettings, function () {
    console.log('Settings saved');
});
