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
						presets: [
							[
							'@babel/preset-env',
							{
								useBuiltIns: 'usage',
								corejs: '3',
							},
						],
							'@babel/preset-flow',
						],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'@babel/plugin-proposal-object-rest-spread',
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