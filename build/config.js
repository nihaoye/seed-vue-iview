const path = require('path')
//是否是开发模式
//特点是使用dev-server
const isDevelopment = process.env.NODE_ENV === 'development'
//是否是产品模式
//特点是压缩代码
const isProduction = process.env.NODE_ENV === 'production'
//是否是自动化测试模式
//也使用dev-server，但是不会自动打开浏览器
const isTesting = process.env.NODE_ENV === 'testing'

//线下测试可以启用sourcemap
//npm run test --map
const isSourceMap = process.env.npm_config_map
//webpack-bundle-analyzer
//npm run build --report
const isReport = process.env.npm_config_report
//是否是线上部署
//npm run build
//npm run prod --online (production+online)
const isOnline = process.env.npm_config_online
//是否是线下开发，有两个场景
//npm run dev --offline (development+offline)
//npm run test (production+offline) 这里没有明确使用offline参数，是隐含着offline
const isOffline = process.env.npm_config_offline

//mock服务器
const MOCK_ROOT = 'A'
//线上服务器
const ONLINE_SERVER_ROOT = 'A'
//线下服务器
const OFFLINE_SERVER_ROOT = 'A'
//线上CDN
const ONLINE_CDN = 'A'
//线下CDN
const OFFLINE_CDN = 'A'

//CDN域名
//production才需要publicPath
//dev-server的publicPath都是/
const publicPath = isOnline ? ONLINE_CDN : OFFLINE_CDN
//代理API服务器域名
//dev-server才需要代理
const proxyRoot = isOffline ? OFFLINE_SERVER_ROOT : MOCK_ROOT
//dev-server才需要代理，配合代理过滤API接口
const apiRoot = isDevelopment ? '/api' : ''
//dev-server才需要代理，配合代理过滤API接口
const localRoot = isOnline ? ONLINE_SERVER_ROOT : (isProduction ? OFFLINE_SERVER_ROOT : '')

//HtmlWebpackPlugin配置参数
//网页title
const title = '放心购'
//编译后的html文件路径
// const filename = isProduction ? '../Smart/Public/index.html' : 'index.html'
const filename = 'index.html'
//html模版路径
const template = 'src/index.html'
//网页icon
const favicon = 'src/assets/logo.png'
//本地mock-json的接口
const mockTable = [
    '/api/channel/list'
]

module.exports = {
    isDevelopment,
    isProduction,
    isTesting,
    isSourceMap,
    isReport,
    isOnline,
    isOffline,
    publicPath,
    proxyRoot,
    apiRoot,
    localRoot,
    title,
    filename,
    template,
    favicon,
    mockTable
}
