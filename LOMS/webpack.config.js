var path = require('path'),
	webpack = require('webpack');

var clientConfig = {
	target: 'web',
	entry: './src/main.js',
	output: {
		path: __dirname,
		filename: 'loms.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env'],
						plugins: [
							require('babel-plugin-transform-object-rest-spread'),
							require('babel-plugin-transform-class-properties'),
						],
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
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
			},
		}),
	],
};

var nodeConfig = {
	target: 'node',
	entry: './src/main.node.js',
	output: {
		path: __dirname,
		filename: 'loms.node.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env'],
						plugins: [
							require('babel-plugin-transform-object-rest-spread'),
							require('babel-plugin-transform-class-properties'),
						],
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
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
			},
		}),
	],
};

module.exports = [nodeConfig, clientConfig];