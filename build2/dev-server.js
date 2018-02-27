const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')

//根据process.env.NODE_ENV获取对应的配置信息
const config = require('./config')
const webpackConfig = process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf')

const app = express()
const compiler = webpack(webpackConfig)
//dev-server
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    stats: {
        colors: true,
        chunks: false
    }
})
//hot-middleware
const hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({action: 'reload'})
        cb()
    })
})
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')(
    {

    }
))
// serve webpack bundle output
app.use(devMiddleware)
// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)


// proxy api requests
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.proxyTable
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context]
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

const port = process.env.PORT || config.port
const autoOpenBrowser = config.autoOpenBrowser
const uri = 'http://localhost:' + port + '/views/home/list.html'
devMiddleware.waitUntilValid(function () {
    console.log('> 构建完成，已自动在浏览器打开页面，如未自动打开，请手工复制下面的链接，复制到浏览器里打开。')
    console.log('> Listening at ' + uri + '\n')
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('\n正在构建初始化中，构建完成后，将自动在浏览器打开页面。')
})
