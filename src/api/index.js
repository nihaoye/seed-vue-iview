import router from '../router/index.js';
import store from '../store/index.js';
import Vue from 'vue'
import iView from 'iview'

Vue.use(iView);

var api = {

}

export default {
    sendAjax(settings) {
        var self = this;

        settings.cache = false;
        settings.data = settings.data || {};
        settings.data.__token = store.state.user.token;

        var dfd = jQuery.Deferred();

        if (__DEV__) {
            settings.url = '/api' + settings.url;
        }

        $.ajax(settings).always(function (res) {
            if (res.code === 0) {
                if (window.Raven && (Math.random() * 100 < 1)) { // 对成功事件进行 1/100 的减少上报
                    window.Raven.captureMessage('API 请求成功：' + settings.url, {
                        tags: {
                            'response.code': res.code
                        },
                        level: 'info'
                    });
                }
                dfd.resolve(res);
            } else {
                if (window.Raven) {
                    if (res.code) {
                        window.Raven.captureMessage('API 请求失败：' + settings.url, {
                            tags: {
                                'response.code': res.code
                            },
                            extra: {
                                'request.data': settings.data,
                                'response.data': res
                            },
                            level: res.code ? 'warning' : 'error'
                        });
                    } else {
                        // 对严重失败，不进行减少上报
                        window.Raven.captureMessage('API 请求挂了：' + settings.url, {
                            tags: {
                                'response.code': res.code || '无返回'
                            },
                            extra: {
                                'request.data': settings.data,
                                'response.data': res
                            },
                            level: res.code ? 'warning' : 'error'
                        });
                    }
                }
                dfd.reject(res);
            }
        });

        dfd.fail(function (res) {
            self.handleAjaxErrorCode(res);
        });

        return dfd.promise();
    },

    handleAjaxErrorCode(res) {
        const $body = $('body');
        const hasPrevModal = $body.hasClass('modal-open');

        if (res.code == '10005') {
            store.commit('logout');
            const { hash } = window.location;
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
            }).done(function (res) {
                store.commit('updateUserInfo', { token: res.data.token });
            });
            bootbox.alert({
                message: 'Token失效了，请重试！',
                callback: function () {
                    if (hasPrevModal) {
                        setTimeout(function () {
                            $body.addClass('modal-open');
                        }, 500);
                    }
                }
            });
        } else {
            res.msg = res.msg || '操作失败了';
            bootbox.alert({
                message: res.msg,
                callback: function () {
                    if (hasPrevModal) {
                        setTimeout(function () {
                            $body.addClass('modal-open');
                        }, 500);
                    }
                }
            });
        }
    },

    goToLogin() {
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
    },

    downloadFile(query, path) {
        var self = this;
        var token = store.state.user.token;
        var url = location.protocol + '//' + location.host + path + '?' + $.param(query) + '&__token=' + token;
        self.clickAnchor(url);
    },

    clickAnchor: function (url) {
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
    },

    logout: function () {
        $.get({
            url: '/index/dologout',
            cache: false
        }).always(function () {
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
};
