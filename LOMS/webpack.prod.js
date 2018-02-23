const webpack = require('webpack'),
	merge = require('webpack-merge'),
	common = require('./webpack.common.js');
	

const nodeConfig = {
	target: (/^win/.test(process.platform)) ? 'web' : 'node',
	entry: './src/main.client.js',
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
			},
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
};

module.exports = merge(common, nodeConfig);