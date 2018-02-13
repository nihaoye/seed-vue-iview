const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const AutoInject = require('./AutoInjectPlugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env,
            __dev__: true,
            __test__: false,
            __prod__: false,
            MODE: JSON.stringify('development'),
            API_ROOT: JSON.stringify('https://' + (process.env.TEST_USER || process.env.USER) + '.danpin.toutiao.com')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ]
})

const pages = utils.pages
for (const pathname in pages) {
    // 配置生成的html文件，定义路径等
    const conf = {
        filename: pathname + '.html',
        template: pages[pathname], // 模板路径
        chunks: [pathname, 'vendors', 'manifest'], // 每个html引用的js模块
        inject: true              // js插入位置
    }
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}

module.exports.plugins.push(new AutoInject({
    script: [
        path.resolve(__dirname, '../vuesrc/assets/js/flexible.js')
    ]
}))
