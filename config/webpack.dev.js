const webpack = require('webpack'),
	merge = require('webpack-merge'),
	common = require('./webpack.common.js');

const webConfig = {
	entry: ['babel-polyfill', './src/main.dev.js'],
	devtool: 'eval-source-map',
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
			},
		}),
	],
};

module.exports = merge(common, webConfig);