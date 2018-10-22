const merge = require('webpack-merge'),
	common = require('./webpack.common.js');

const webConfig = {
	entry: ['babel-polyfill', './src/main.dev.js'],
	devtool: 'eval-source-map',
	mode: 'development',
};

module.exports = merge(common, webConfig);