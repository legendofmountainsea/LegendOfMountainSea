const webpack = require('webpack'),
	merge = require('webpack-merge'),
	common = require('./webpack.common.js');
	

const nodeConfig = {
	entry: ['babel-polyfill', './src/main.client.js'],
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
};

module.exports = merge(common, nodeConfig);