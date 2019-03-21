const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ENV = process.env.ENV = process.env.NODE_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sourcePath = path.resolve(__dirname, '../src/');

module.exports = {
    entry: {
        'html5shiv': path.join(__dirname, '../js/html5shiv.js'),
        'respond': path.join(__dirname, '../js/respond.js'),
        'site': path.join(__dirname, '../scss/site.scss')
    },
    resolve: {
        extensions: ['.scss', '.js', '.html', '.css'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                use: 'file-loader?name=/images/[name].[ext]'
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader?url=false',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['ie >= 8', 'last 4 version']
                                    })
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'ENV': JSON.stringify(ENV),
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),
        new CopyPlugin([
            {
                context: path.resolve(sourcePath, './fonts'),
                from: '**/*',
                to: './fonts'
            },
            {
                context: path.resolve(sourcePath, './images'),
                from: '**/*',
                to: './images'
            }
        ])
    ]
};
