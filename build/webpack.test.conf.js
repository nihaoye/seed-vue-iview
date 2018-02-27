process.env.NODE_ENV = 'testing';

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.conf')


module.exports = merge(baseConfig, {
    output: {
        publicPath: 'https://kaidian.tms3.bytecdn.cn/dist/'
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: process.env.npm_config_map,
            extract: true
        })
    },
    plugins: [

    ]
})
