var webpack = require('webpack');
var path = require('path');

module.exports = function() {
    return {
        entry: {
            javascript: './src/index.js'
        },
        output: {
            path: path.join(__dirname, '../'),
            filename: 'app.js'
        },
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