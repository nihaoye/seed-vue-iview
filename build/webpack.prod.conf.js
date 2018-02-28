process.env.NODE_ENV = 'production';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin')

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const utils = require('./utils')
const config = require('./config')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
    bail: true, //ci直接报错
    output: {
        publicPath: config.publicPath
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.isSourceMap,
            extract: true
        })
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap: config.isSourceMap
        }),
        new OptimizeCSSPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                },
                // 避免 cssnano 重新计算 z-index
                safe: true
            },
            canPrint: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'main'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                return module.context && module.context.includes("node_modules");
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new InlineChunkManifestHtmlWebpackPlugin(),
    ]
})

if (config.isReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    module.exports.plugins.push(new BundleAnalyzerPlugin())
}
