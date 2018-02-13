var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin')
var HandleHtmlPlugin = require('./webpack.HandleHtml.plugin')
var OfflineZipPlugin = require('./webpack.OfflineZip.plugin')

var entries =  utils.getMultiEntry('./vuesrc/'+config.moduleName+'/**/**/*.js'); // 获得入口js文件
var chunks = Object.keys(entries);


var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  bail: true, //ci直接报错
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  //devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
      __dev__: false,
      __test__: false,
      __prod__: true,
        __MOCK__:false,
      MODE: JSON.stringify('production'),
      API_ROOT: JSON.stringify('https://haohuo.snssdk.com')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {removeAll:true},
            // 避免 cssnano 重新计算 z-index
            safe: true
        },
        canPrint: false
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
   /* new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),*/
    // split vendor js into its own file
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),*/
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
        name: 'app',
        chunks: chunks,
        minChunks: function(module, count) {
            return module.resource && (/vuesrc/).test(module.resource) && count >= 4;
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: chunks,
	  minChunks: function(module, count) {
          return module.resource && (/node_modules/).test(module.resource) && count >= 4;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
	/*
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])*/


  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

//构建生成多页面的HtmlWebpackPlugin配置，主要是循环生成
var pages =  utils.getMultiEntry('./vuesrc/'+config.moduleName+'/**/**/*.html');
var templates = []
for (var pathname in pages) {

  var conf = {
    // filename: pathname + '.html',
    filename: path.resolve(__dirname, '../../Smart/Public', pathname + '.html'),
    template: pages[pathname], // 模板路径
    chunks: ['manifest','vendor','app',pathname], // 每个html引用的js模块
    chunksSortMode: 'manual',
    inject: true              // js插入位置
  };

  templates.push(conf.filename)

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

webpackConfig.plugins.push(new InlineChunkManifestHtmlWebpackPlugin());

webpackConfig.plugins.push(new HandleHtmlPlugin({
  templates: templates,
  script: [
      {
          filePath: path.resolve(__dirname, '../vuesrc/assets/js/dns.js'),
          wrapper: false
      },
      path.resolve(__dirname, '../vuesrc/assets/js/flexible.js'),
      path.resolve(__dirname, '../vuesrc/assets/js/tea.js'),
  ],
  compress: true,
  debug: false
}));

webpackConfig.plugins.push(new OfflineZipPlugin());

module.exports = webpackConfig
