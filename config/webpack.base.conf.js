var path = require('path');
var config = require('./index');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
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
            }
        ]
    },
    
}