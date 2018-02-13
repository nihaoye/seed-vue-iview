console.log('部署环境启动');

fis.set('project.files', ['/src/**']);
fis.set('project.fileType.text', 'phtml');

var cdn_domain = 'https://tms3.bytecdn.cn/s';

//静态资源添加域名
fis.match('*.{js,css,less,png,gif,jpg,jpeg,svg,eot,woff,woff2,ttf}', {
    useHash: true,
    useDomain: true,
    domain: cdn_domain
});

//src目录中资源配置
//release模版
fis.match('/src/views/(**)/*.phtml', {
    url: '/$1',
    release: '../Smart/Views/$1',
    useHash: false,
    useDomain: false,
    domain: null
});
//release静态资源
fis.match('/src/(**.{js,css,less,png,gif,jpg,jpeg,html,svg,eot,woff,woff2,ttf})', {
    url: '/$1',
    release: '/dist/$1'
});
//业务js模块化包裹
fis.match('/src/views/(**).js', {
    isMod: true,
    useSameNameRequire: true
});
//组件js模块化包裹
fis.match('/src/components/(**).js', {
    isMod: true,
    moduleId: '$1',
    useSameNameRequire: true
});

//node_modules目录中资源配置
//release静态资源
fis.match('/node_modules/(**.{js,css,less,png,gif,jpg,jpeg,html,svg,eot,woff,woff2,ttf})', {
    url: '/n/$1',
    release: '/dist/n/$1'
});
//node_modules组件js模块化包裹
fis.match('/node_modules/**.js', {
    isMod: true,
    useSameNameRequire: true
});

//重新指定pkg目录中静态资源访问路径
fis.match('/dist/pkg/(*.{js,css})', {
    url: '/pkg/$1'
});

//less支持
fis.match('*.less', {
    parser: fis.plugin('less2'),
    rExt: '.css'
});

//压缩文件
fis.match('*.js', {
    optimizer: fis.plugin('uglify-js')
});
fis.match('*.css', {
    optimizer: fis.plugin('clean-css')
});
fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});


//模块化支持
fis.hook('commonjs', {
    extList: ['.js']
});


//node_modules支持
fis.unhook('components')
fis.hook('node_modules')


//打包支持
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        useInlineMap: true
    })
});

fis.match('::package', {
    packager: fis.plugin('deps-pack', {

        'dist/pkg/pkg_components.js': [
            '/src/components/**.js'
        ],

        'dist/pkg/pkg_assets.js': [
            '/src/assets/js/dayMode.js',
            '/src/assets/js/toutiao.js',
            '/src/assets/js/common.js',
            '/src/assets/js/env.js',
            '/src/assets/js/openLink.js',
            '/src/assets/js/stat.js',
            '/src/assets/js/helper.js'
        ],

        'dist/pkg/pkg_components.css': [
            '/src/components/**.css'
        ],

    })
});
