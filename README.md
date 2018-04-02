## 参考文档
1. [vuejs-templates](http://vuejs-templates.github.io/webpack/)


## 使用场景
1. 前端本地开发
    development: dev-server + easyMock
    因为跨域需要代理API
1. 后端联调开发
    development: dev-server + php
    因为跨域需要代理API
1. 测试人员测试(后端自测)
    production: php + sourceMap
    没有跨域，不需要代理
1. 自动化测试
    testing: dev-server + test
    没有网络请求
1. 线上部署
    production: php


## 命令解释
1. npm run dev
    dev-server本地开发，使用mock服务器
1. npm run dev --offline
    dev-server本地开发，使用线下php服务器
1. npm run build
    线上部署编译
1. npm run build --report
    线上部署编译，并且显示webpack分析报告
1. npm run prod
    线下开发一次性编译，即不使用watch
1. npm run test
    线下开发编译，使用watch
1. npm run test --map
    线下开发编译，使用watch，并且使用sourceMap
1. npm run unit
    执行单元测试
1. npm run e2e
    执行端到端测试
1. npm run lint
    执行eslint检查
1. npm run lint:fix
    执行eslint检查，并且修复错误


## 支持功能
1. vue-router
1. vuex
1. Babel
    1. env + stage2
    1. es6 --> es5
1. Linter / Formatter
    1. eslint:recommended + plugin:vue/recommended
    1. husky: git commit hook
    1. npm run lint
    1. npm run lint:fix
1. SCSS/SASS Autoprefixer
    1. lang="scss"
    1. autoprefixer自动添加前缀
        1. 使用package.json中的browserslist


## 全局环境变量
1. process.env.NODE_ENV
    1. development
    1. production
    1. testing
1. API_ROOT
    1. /
    1. /api
1. LOCAL_ROOT
    1. /
    1. online
    1. offline


## 使用注意事项
1. 接口代理技巧
修改build/config.js文件中的MOCK_ROOT和OFFLINE_SERVER_ROOT，分别代表mock服务器和线下服务器
为了支持团队中没有mock服务器，本项目也支持在根目录下mock文件夹中写json文件

1. 与后端集成
由于是单页面项目，与后端的集成非常简单，只要修改build/config.js文件中filename属性值

1. 使用iview框架
使用iview-loader，集成ionicons
注意组件的大小写，组件统一采用首字母大写的Pascal格式

1. 图片路径技巧
    1. 绝对路径-不变
    1. 相对路径-相对当前文件寻找图片
    1. 不加前缀-同相对路径
    1. ~assets-以波浪号为前缀
        1. 需要配合webpack设置resolve.alias
        1. 通过alias寻找图片

1. js文件打包成三部分
    1. node_modules文件夹中的vendor.js
    1. 业务代码main.js
    1. manifest.js
        1. manifest文件直接内联到index.html文件中

1. 支持全局es6-promise-polyfill
全局引入require('es6-promise').polyfill()

1. 全局fastclick
暂不支持，移动端才需要fastclick

1. 使用axios代替jquery的ajax，避免使用jquery
全局引入axios库

1. 全局方法统一使用Lib.js来导出

1. css module
vue文件中style标签默认支持css module

1. 统一统计接口
统一使用唯一的统计方法：stats(event, options)
event是事件名称，是一个字符串
options则是事件的补充描述，是一个对象
该方法是抽象的，底层会自动调用google/baidu/...

1. husky
提供了git commit hook
即当执行git commit时，会先执行npm run lint，只有通过检查才能提交代码

1. 依赖权限系统
    1. 权限系统配置用户+角色+权限+菜单
    1. 通过接口返回该用户的权限列表以及可访问的菜单列表
    1. 通过菜单列表动态创建菜单树以及路由系统

1. easyMock搭建
    https://github.com/easy-mock/easy-mock-cli

1. 本地json-mock
    在mock文件夹中写数据文件就可以了，注意与路径匹配

1. 使用webpack.ProvidePlugin插件全局导出
    1. es6-promise，
    1. lodash

1. css module 结合 SCSS
解决scope方式慢的缺点
https://vue-loader.vuejs.org/zh-cn/features/css-modules.html
https://github.com/css-modules/css-modules

1. sourceMap相关
https://doc.webpack-china.org/configuration/devtool/
https://survivejs.com/webpack/building/source-maps/
http://cheng.logdown.com/posts/2016/03/25/679045
开发模式可以选择 cheap-module-eval-source-map
产品模式可以选择 source-map
webpack配置中的devtool属性必须配置，而且css-loader和UglifyJsPlugin等插件都必须配置sourceMap: true

另外一种思路，开发时不需要配置sourceMap，联调的时候打包source-map，线上部署也不配置sourceMap，因为不想暴露源码
当前项目已经默认配置了devtool，但是构建的时候相关loader默认是关闭的，需要手动指定--map参数

1. iview框架
所有组件都必须是首字母大写，已经在webpack.base.conf.js文件中配置过了，除非修改prefix: true

#### Todo
1. 自动化测试
    1. 单元测试 - Unit Testing
    1. 端到端测试 - E2E Testing
1. happypack
1. dllplugin
1. 使用yarn
#### 提供的页面
1. 登录页面
1. 默认首页
1. 登录后首页
1. 登录后组件页面
