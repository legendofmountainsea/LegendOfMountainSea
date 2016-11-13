var path = require('path');

var pixi = path.join(__dirname, '/node_modules/pixi.js/bin/pixi.min.js');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: "loms.js"
    },
    module: {
        loaders: [
            { test: /pixi.js/, loader: "script" },
        ]
    },
    resolve: {
        alias: {
            'pixi.js': pixi
        }
    }
}