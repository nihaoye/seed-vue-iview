var glob = require('glob')
var path = require('path')
var fs = require('fs')
var fse = require('fs-extra')
var UglifyJS = require('uglify-js')

function OfflineZip(options) {
    this.options = options || {};
}

//把dist目录下的css和js文件打包成zip文件，做离线缓存
//获取准备离线缓存的文件，转移到dist_offline文件夹中
OfflineZip.prototype.apply = function(compiler) {
    var that = this
    var debug = this.options.debug
    compiler.plugin('done', function(stats, callback) {
        var files = glob.sync('./dist/**/*.{css,js}')

        //过滤不符合要求的文件
        var collectFiles = [];
        files.forEach(function (file) {
            //排除home文件夹，因为是用来测试的，线上没有用到
            if(file.indexOf('views/home') == -1) {
                collectFiles.push(file.slice(7))
                var destFile = file.replace('dist', 'dist_offline');
                fse.copySync(file, destFile);
            }
        });

        //生成mapping.txt
        var ret = {};
        const domain = 'https://tms3.bytecdn.cn/s/';
        collectFiles.forEach(function (file) {
            ret[domain + file] = { path: file }
        });

        //拷贝首页html文件
        var srcFile = '../Smart/Public/views/channel/list.html';
        var destFile = './dist_offline/static/views/channel/list.html';
        fse.copySync(srcFile, destFile);
        ret['https://haohuo.snssdk.com/channel/list'] = { path: 'static/views/channel/list.html' };

        var mappingTxtPath = './dist_offline/mapping.txt';
        fse.outputJsonSync(mappingTxtPath, ret);
    })
};

module.exports = OfflineZip;
