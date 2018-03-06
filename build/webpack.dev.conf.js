process.env.NODE_ENV = 'development';

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const utils = require('./utils')
const config = require('./config')
const baseConfig = require('./webpack.base.conf')

Object.keys(baseConfig.entry).forEach(function(name) {
    baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ]
})
