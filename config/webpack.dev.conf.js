var path = require('path');
var webpack =require('webpack');
var config = require('./index');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// process.env.NODE_ENV = 'production';

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = [path.resolve(__dirname, './dev-client.js')].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    // entry: {
    //     app: [
    //         path.resolve(__dirname, './dev-client.js'),
    //         path.resolve(__dirname, '../src/index.js')
    //     ]
    // },
    devtool: '#cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: false
        }),
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new CopyWebpackPlugin([
            { from: './src/data.json' }
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsWebpackPlugin()
    ]
});

