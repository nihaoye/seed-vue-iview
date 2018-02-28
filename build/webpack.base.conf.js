const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const path = require('path')
const webpack = require('webpack')
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
            filename: 'index.html',
            template: resolve('src/index.html'),
            inject: true
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': resolve('src'),
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
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: utils.cssLoaders({
                        sourceMap: config.isProduction && config.isSourceMap,
                        extract: config.isProduction
                    }),
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['iOS >= 7', 'Android >= 4.1']
                        })
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [resolve('node_modules'), resolve('dist'), resolve('test')]
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
