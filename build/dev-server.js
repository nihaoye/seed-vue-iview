const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')

const config = require('./config')
const webpackConfig = require('./webpack.dev.conf')

const app = express()

// 调用webpack并把配置传递过去
const compiler = webpack(webpackConfig)

// 使用 webpack-dev-middleware 中间件
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    stats: {
        colors: true,
        chunks: false
    }
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({action: 'reload'})
        cb()
    })
})


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')(
    {

    }
))

// 注册中间件
app.use(devMiddleware)
app.use(hotMiddleware)

if(config.apiRoot) {
    app.use(proxyMiddleware(config.apiRoot, {
        target: config.proxyRoot,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
            '^/api': ''
        }
    }))
}

const port = 8080
const autoOpenBrowser = true
const uri = 'http://localhost:' + port
devMiddleware.waitUntilValid(function () {
    console.log('> 构建完成，已自动在浏览器打开页面，如未自动打开，请手工复制下面的链接，复制到浏览器里打开。')
    console.log('> Listening at ' + uri + '\n')
    if (autoOpenBrowser && !config.isTesting) {
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
