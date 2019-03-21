const path = require('path');
const webpack = require('webpack');


module.exports = {
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../../'),
        filename: 'js/[name].js',
        sourceMapFilename: 'js/[name].map'
    },
    devServer: {
        contentBase: path.join(__dirname, '../../'),
        compress: true,
        historyApiFallback: true,
        stats: {
            colors: true
        },
        host: 'localhost',
        port: 9045,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
};
