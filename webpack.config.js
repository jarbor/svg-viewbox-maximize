const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		'svg-viewbox-maximize': './src/svg-viewbox-maximize.js',
		'svg-viewbox-maximize.min': './src/svg-viewbox-maximize.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname),
		library: 'SvgViewboxMaximize',
		libraryTarget: 'umd',
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