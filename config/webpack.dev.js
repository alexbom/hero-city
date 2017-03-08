var webpack = require('webpack');
var path = require('path');

module.exports = function() {
    return {
        devtool: 'inline-source-map',
        entry: [
            'webpack-dev-server/client?http://127.0.0.1:8080/',
            'webpack/hot/only-dev-server',
            './src'
        ],
        output: {
            path: path.join(__dirname, '../src'),
            filename: 'bundle.js'
        },
        resolve: {
            modulesDirectories: ['node_modules', 'src'],
            extensions: ['', '.js']
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
                },
                {
                    test: /\.less$/,
                    loader: "style!css!less"
                }
            ]
        }
    }
};