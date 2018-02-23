const webpack = require('webpack'),
	merge = require('webpack-merge'),
	common = require('./webpack.common.js');

const nodeConfig = {
	target: (/^win/.test(process.platform))?'web': 'node',
	entry: './src/main.client.js',
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
			},
		}),
	],
};

module.exports = merge(common, nodeConfig);