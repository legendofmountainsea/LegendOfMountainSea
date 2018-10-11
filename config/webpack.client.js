const webpack = require('webpack'),
	merge = require('webpack-merge'),
	common = require('./webpack.common.js');

const nodeConfig = {
	entry: ['babel-polyfill', './src/main.client.js'],
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
			},
		}),
	],
};

module.exports = merge(common, nodeConfig);