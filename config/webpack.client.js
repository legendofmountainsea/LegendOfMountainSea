const merge = require('webpack-merge'),
	common = require('./webpack.common.js');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const nodeConfig = {
	entry: ['babel-polyfill', './src/main.client.js'],
	mode: 'development',
	optimization: {
		minimizer: [new UglifyJsPlugin()],
	},
};

module.exports = merge(common, nodeConfig);