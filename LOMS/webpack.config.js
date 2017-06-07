var path = require('path');

var clientConfig = {
	target:'web',
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: "loms.js"
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "es2015",
                            "stage-0"
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            'pixi$': path.resolve(__dirname, '/node_modules/pixi.js/bin/pixi.min.js')
        }
    }
}

var serverConfig = {
	target:'node',
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: "loms.node.js"
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "es2015",
                            "stage-0"
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            'pixi$': path.resolve(__dirname, '/node_modules/pixi.js/bin/pixi.min.js')
        }
    }
}

module.exports = [ serverConfig, clientConfig ];