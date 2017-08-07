var webpack = require('webpack');
var config = require('../config');
var devWebpackConfig = require('../config/webpack.dev.conf');
var opn = require('opn');
var express = require('express');

var app = express();
var compiler = webpack(devWebpackConfig);

var port = config.dev.port;
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: devWebpackConfig.output.publicPath,
  quiet: false,
  stats: {
    colors: true
  }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at http://localhost:${port} `)
  opn(`http://localhost:${port}`, { app: 'chrome' })
})

app.listen(port);
