var webpack = require('webpack');
var path = require('path');

module.exports = function() {
    return {
        entry: {
            javascript: './src/index.js'
        },
        output: {
            path: __dirname,
            filename: '../app.js'
        },
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                comments: false,
                compress: {
                    sequences    : true,
                    booleans     : true,
                    loops        : true,
                    unused       : true,
                    warnings     : false,
                    drop_console : true,
                    unsafe       : true
                }
            })
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