这是Smart项目的前端代码库

#### 本地开发
1. 启动fis3编译
`npm run dev`
1. 启动本地php环境
`npm run fps`
1. 访问URL
http://localhost:8099/product/index
http://localhost:8099/order/list


#### 130测试环境
1. 登录10.8.45.130机器
`ssh username@10.8.45.130`
密码也是username
1. 进入fe-smart项目目录下
1. 启动fis3编译
`npm test`
1. 访问URL
https://username.danpin.snssdk.com/product/index?id=XXXXXXXX
https://username.danpin.snssdk.com/order/list


#### webpack构建流程
1. vuesrc目录是与src平级的目录
    1. src目录下是基于fis3构建的，主要使用jquery
    1. vuesrc目录下则是基于webpack构建，主要使用vue
1. `npm run vuedev` 可以本地开发，编译结果是在内存中，会启动一个本地的server
1. `npm run vuetest` 可以在130上开发，编译结果：模版被编译到Smart/Public目录下面，静态资源则是在dist目录下，并且持续监听文件的改动，自动编译
1. `npm run vueubuild` 上线前编译脚本，会压缩js和css，模版也是编译到Smart/Public下面，静态资源则在dist目录
1. `npm run vueubuild --report` 查看webpack打包细节，会自动打开浏览器

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
