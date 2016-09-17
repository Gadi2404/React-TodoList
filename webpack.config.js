var ExtractTextPlugin = require('extract-text-webpack-plugin'),
	autoprefixer = require('autoprefixer');

module.exports = {
	entry: './build/main.js',
	output: {
		path: './',
		filename: 'bundle.js'
	},
	devServer: {
		inline: true,
		port: 3333
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			},
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass!postcss')
            }
		]
	},
    plugins: [
        new ExtractTextPlugin('dist/style.css', {
            allChunks: true
        })
    ],
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
}