var path = require('path');
var config = require('./index');
var webpack = require('webpack');
var cssLoders = require('./cssloaders.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: config.build.assetsRoot,
        filename: path.posix.join(config.build.assetsSubDriectory, 'js/[name].js'),
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['ng-annotate-loader', 'babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        cssLoders.css,
                        cssLoders.postCss,
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        cssLoders.css,
                        cssLoders.postCss,
                        cssLoders.less
                    ]
                })
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: path.posix.join(config.build.assetsSubDriectory, 'images/[name].[ext]')
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: isProduction,
                            gifsicle: { interlaced: false },
                            mozjpeg: { progressive: true, arithmetic: false },
                            optipng: false, // disabled
                            pngquant: { floyd: 0.5, speed: 2 },
                            svgo: { plugins: [{ removeTitle: true }, { convertPathData: false }]}
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(isProduction
                ? path.posix.join(config.build.assetsSubDriectory, 'css/[name]-[chunkhash:8].min.css')
                : path.posix.join(config.build.assetsSubDriectory, 'css/[name].css')),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: false,
            minify: isProduction
                    ? {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true
                    } : false,
            // chunksSortMode: 'dependency'
        }),
        new webpack.DefinePlugin({
            'process.env': process.env.NODE_ENV
        }),
        new CopyWebpackPlugin([
            { from: './src/data.json' }
        ])
    ]

}