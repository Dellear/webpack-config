var path = require('path');

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDriectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false


    },
    dev: {
        env: require('./dev.env'),
        port: 9000,
        autoOpenBrowser: true,
        assetsSubDriectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false
    }
}