process.env.NODE_ENV = 'production';

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.conf')


module.exports = merge(baseConfig, {
    output: {
        publicPath: 'https://tms3.bytecdn.cn/dist/online/shoptm/'
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: process.env.npm_config_map,
            extract: true
        })
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
})
