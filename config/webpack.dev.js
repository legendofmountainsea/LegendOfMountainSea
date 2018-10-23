const merge = require('webpack-merge'),
	common = require('./webpack.common.js');

const webConfig = {
	entry: './src/main.dev.js',
	devtool: 'eval-source-map',
	mode: 'development',
};

module.exports = merge(common, webConfig);