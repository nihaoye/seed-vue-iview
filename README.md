// see http://vuejs-templates.github.io/webpack for documentation.

## 提供的页面
登录页面
默认首页
登录后首页
登录后组件页面

## 123
本地开发
    mock数据
与后端联调
    走后端接口
与线上环境一致的测试环境
    需要走线上编译

1. 支持特性
    1. 支持iconfont
    1. 支持img图片和css图片，小图直接base64
    1. 公共js和css自动抽取，由minchunks决定
    1. 支持全局es6-promise-polyfill
    1. 全局fastclick
    1. 使用axios代替jquery的ajax，避免使用jquery
    1. 支持全局配置文件和全局通用方法，统一使用Lib.js来导出
    1. 支持vue-filter和vue-components

#### 待实现功能
1. common.js转移
1. 全局配置文件
1. 通用过滤器
1. 通用组件
    1. 弹窗
    1. 1像素分割线
    1. toast组件
1. flexible布局支持
1. postcss
    1. autoprefix
    1. px2rem
1. 统一统计接口


## 总结
Router
Vuex
CSS Pre-processors
Linter / Formatter
Unit Testing
E2E Testing
Babel
CSS pre-processor --> SCSS/SASS --> PostCSS, Autoprefixer and CSS Modules are supported by default
ESLint + Standard config --> ◯ Lint and fix on commit
unit testing --> Mocha + Chai
E2E testing --> Cypress

PC
    单页面
    多页面
移动
    单页面
    多页面

服务器端渲染


## 场景
1. 前端本地开发
    dev-server + easyMock
    因为跨域需要代理API-前提是需要识别API
1. 后端联调开发
    dev-server + php
    因为跨域需要代理API-前提是需要识别API
1. 测试人员测试(后端自测)
    php+prod+sourceMap
    没有跨域，不需要代理
1. 自动化测试
    dev-server + test
    没有网络请求
1. 线上部署
    php + prod

## 命令解释
1. npm run dev
    dev-server本地开发，使用mock服务器
1. npm run dev --offline
    dev-server本地开发，使用线下php服务器
1. npm run build
    线上部署编译
1. npm run build --report
    线上部署编译，并且显示webpack分析报告
1. npm run test
    线下开发编译
1. npm run test --map
    线下开发编译，并且使用sourceMap，并且使用watch
1. npm run prod
    线下开发一次性编译，即不使用watch
1. npm run e2e
    执行端到端测试
1. npm run lint
    执行eslint检查
1. npm run lint:fix
    执行eslint检查，并且修复错误

## 全局环境变量
1. publicPath:
    1. /
    1. online
    1. offline
1. PROXY_ROOT:
    1. mock
    1. offline
1. API_ROOT:
    1. /
    1. /api
1. LOCAL_ROOT:
    1. /
    1. online
    1. offline
