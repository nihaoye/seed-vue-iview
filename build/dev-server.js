const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')
const proxyMiddleware = require('http-proxy-middleware')

const app = express()

// 调用webpack并把配置传递过去
const compiler = webpack(webpackConfig)

// 使用 webpack-dev-middleware 中间件
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
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

// 注册中间件
app.use(devMiddleware)
app.use(hotMiddleware)


app.listen(8080, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:8080')
})
