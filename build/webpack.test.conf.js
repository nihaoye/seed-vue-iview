process.env.NODE_ENV = 'testing';

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const utils = require('./utils')
const config = require('./config')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
    plugins: [

    ]
})
