import router from '../router/index.js';
import store from '../store/index.js';
import Vue from 'vue'
import iView from 'iview'
import axios from 'axios'

Vue.use(iView);

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(function(config) {
    if (__DEV__) {
        config.url = '/api' + config.url;
    }
    if(config.method === 'get') {
        config.params.__t = new Date().getTime();
    }
    config.data.__token = store.state.user.token;
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

function sendAjax(settings) {
    return axios(settings).catch(handleAjaxErrorCode);
}

function handleAjaxErrorCode(res) {
    const $body = $('body');
    const hasPrevModal = $body.hasClass('modal-open');

    if (res.code == '10005') {
        store.commit('logout');
        const {
            hash
        } = window.location;
        if (white_urls.includes(hash.slice(1))) return;
        router.push('/index/home');
        // this.goToLogin();
    } else if (res.code == '10004') {
        store.commit('disable');
        router.push('/index/home');
    } else if (res.code == '10008') {
        store.commit('setUserInValid', res.data);
    } else if (res.code == '10010') {
        this.sendAjax({
            url: '/common/index/index',
            type: 'GET',
            dataType: 'json'
        }).done(function(res) {
            store.commit('updateUserInfo', {
                token: res.data.token
            });
        });
        bootbox.alert({
            message: 'Token失效了，请重试！',
            callback: function() {
                if (hasPrevModal) {
                    setTimeout(function() {
                        $body.addClass('modal-open');
                    }, 500);
                }
            }
        });
    } else {
        res.msg = res.msg || '操作失败了';
        bootbox.alert({
            message: res.msg,
            callback: function() {
                if (hasPrevModal) {
                    setTimeout(function() {
                        $body.addClass('modal-open');
                    }, 500);
                }
            }
        });
    }
}





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

function downloadFile(query, path) {
    var self = this;
    var token = store.state.user.token;
    var url = location.protocol + '//' + location.host + path + '?' + $.param(query) + '&__token=' + token;
    self.clickAnchor(url);
}

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

function logout() {
    sendAjax({
        url: '/index/dologout'
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

};
