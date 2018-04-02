#### 简介
modules目录中文件名按照模块命名，模块是依照后端的定义来定的

使用axios作为http库

全局判断http请求是否成功
    默认token设置为header中
    默认请求的content-type为application/json
    code非零代表失败，默认弹框提示，特殊code需要跳转路由，或者重试

## 由于是sso登录
1. 获取当前用户信息的接口
1. 登出接口
