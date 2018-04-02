// import router from '../router/index.js';
import store from '../store/index.js';
import Vue from 'vue'
import iView from 'iview'
import axios from 'axios'
import qs from 'qs'

Vue.use(iView);

axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(function(config) {
    if (process.env.NODE_ENV === 'development') {
        config.url = '/api' + config.url;
    }
    if(config.method === 'get') {
        config.params = config.params || {};
        config.params.__t = new Date().getTime();
        config.params.__token = store.state.user.token;
    } else {
        config.data = config.data || {};
        config.data.__token = store.state.user.token;
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
    if(response.data.code === 0) {
        return response;
    } else {
        return Promise.reject({response:response});
    }
}, function(error) {
    return Promise.reject(error);
});

function errorLog(msg) {
    Vue.prototype.$Message.error(msg || '接口请求失败了');
}

function sendAjax(settings) {
    return axios(settings).catch(handleAjaxErrorCode);
}

function handleAjaxErrorCode(error) {
    if(error.response) {
        var res = error.response.data;
        if(res.code === 10005) {
            //未登录去首页
        } else if(res.code === 10004) {
            //账户被封禁去商户解禁页面
            errorLog(res.message)
        } else if(res.code === 10008) {
            //非法用户，越权访问，toast提示
            errorLog(res.message)
        } else if(res.code === 10010) {
            //token失效，toast提示，并且自动获取新的token
            errorLog(res.message)
            sendAjax({
                url: '/common/index/index',
            }).done(function(res) {
                store.commit('updateUserInfo', {
                    token: res.data.token,
                });
            });
        } else {
            //默认toast提示
            errorLog(res.message)
        }
        console.error(error.response);
    } else if(error.request) {
        console.error(error.request);
    } else {
        console.error('Error', error.message);
    }
    console.error(error.config);
}

/*
 * 下载文件
 */
function downloadFile(path, query) {
    query = query || {};
    query.__token = store.state.user.token;
    var url = location.protocol + '//' + location.host + path + '?' + qs.stringify(query);
    clickAnchor(url);
}

/*
 * 在新页面打开链接
 */
function clickAnchor(url) {
    var a = document.getElementById('__downloadLink__');
    if (!a) {
        a = document.createElement('a');
        a.id = '__downloadLink__';
        a.target = '_blank';
        a.style.display = 'none';
        document.body.appendChild(a);
    }
    a.href = url;
    a.click();
}

/*
 * 去登录，防止登录状态不同步，需要做重试次数限制
 */
function goToLogin() {
    var checkTimes = localStorage.getItem('check_times') || 1;
    checkTimes *= 1;
    if (checkTimes < 4) {
        checkTimes += 1;
        localStorage.setItem('check_times', checkTimes);
        var next = encodeURIComponent(location.protocol + '//' + location.host);
        location.href = 'https://sso.toutiao.com/login/?service=' + next;
    } else {
        localStorage.setItem('check_times', 1);
    }
}

/*
 * 登出接口
 * 先登出自己系统
 * 再调用SSO的登出服务
 */
function logout() {
    sendAjax({
        url: '/index/dologout',
    }).then(function() {
        var url = 'https://sso.toutiao.com/logout/';
        if (store.state.user.toutiao_type === 'huoshan') {
            url = 'https://sso.huoshan.com/logout/';
        } else if (store.state.user.toutiao_type === 'douyin') {
            url = 'https://sso.douyin.com/logout/';
        }
        store.commit('logout');
        location.href = url + '?service=https%3A%2F%2Fkaidian.jinritemai.com%2Findex.html';
    });
}

export default {
    goToLogin,
    logout,
    downloadFile,
    clickAnchor,
    sendAjax,
};
