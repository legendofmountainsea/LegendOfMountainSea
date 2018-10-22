const path = require('path'),
	CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
	output: {
		path: path.resolve(__dirname, '../'),
		filename: 'loms.game.js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
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
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'html-es6-template-loader',
					options: {
						transpile: true,
					},
				},
			},
		],
	},
	plugins: [
		new CircularDependencyPlugin({
			exclude: /node_modules/,
			failOnError: true,
			cwd: process.cwd(),
		}),
	],
};