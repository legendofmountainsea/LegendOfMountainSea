var path = require('path'),
    webpack = require('webpack');

var clientConfig = {
    target: 'web',
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'loms.js',
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
                        presets: ['env'],
                        plugins: [require('babel-plugin-transform-object-rest-spread'), require('babel-plugin-transform-class-properties')],
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            'pixi': path.resolve(__dirname, '/node_modules/pixi.js/bin/pixi.min.js'),
        },
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
};

var serverConfig = {
    target: 'node',
    entry: './src/main.node.js',
    output: {
        path: __dirname,
        filename: 'loms.node.js',
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
                        presets: ['env'],
                        plugins: [require('babel-plugin-transform-object-rest-spread'), require('babel-plugin-transform-class-properties')],
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            'pixi': path.resolve(__dirname, '/node_modules/pixi.js/bin/pixi.min.js'),
        },
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
};

module.exports = [serverConfig, clientConfig];