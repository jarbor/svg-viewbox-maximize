const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		'svg-maximize': './src/svg-maximize.js',
		'svg-maximize.min': './src/svg-maximize.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname),
		library: 'SvgMaximize',
		libraryExport: 'default'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	},
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};