const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const utils = require('./utils')
const config = require('./config')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        main: resolve('src/main.js')
    },
    output: {
        path: resolve('dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            },
            API_ROOT: JSON.stringify(config.apiRoot),
            LOCAL_ROOT: JSON.stringify(config.localRoot)
        }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new HtmlWebpackPlugin({
            title: config.title,
            filename: config.filename,
            template: config.template,
            favicon: config.favicon,
            inject: true
        })
    ],
    resolve: {
        modules: [resolve('node_modules')],
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': resolve('src'),
            'src': resolve('src'),
            'api': resolve('src/api'),
            'assets': resolve('src/assets'),
            'components': resolve('src/components'),
            'config': resolve('src/config'),
            'directives': resolve('src/directives'),
            'filters': resolve('src/filters'),
            'mixins': resolve('src/mixins'),
            'router': resolve('src/router'),
            'store': resolve('src/store')
        }
    },
    module: {
        noParse: function(content) {
            return /jquery|lodash/.test(content);
        },
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: utils.cssLoaders({
                        sourceMap: config.isProduction && config.isSourceMap,
                        extract: config.isProduction
                    }),
                    postcss: [
                        require('autoprefixer')()
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                include: resolve('src')
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1000,
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            },
        ]
    }
}
