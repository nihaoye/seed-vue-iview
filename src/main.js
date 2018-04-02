import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'iview/dist/styles/iview.css';

import api from 'api'

Vue.config.productionTip = false

function componentFn(com) {
    return resolve => require(['./views' + com], resolve);
}

function initRouter(res) {
    router.addRoutes(
        [
            {
                path: '/',
                component: componentFn('/index/index'),
            },
        ]
    );
    if(res && res.data && res.data.data && res.data.data.menu) {
        var homeIndex = {
            path: '/',
            component: componentFn('/home/frame'),
        }
        homeIndex.children = res.data.data.menu.map(function(item) {
            var c = item.component;
            item.component = componentFn(c);
            return item;
        })
        router.addRoutes([homeIndex]);
    }
    router.addRoutes(
        [
            {
                path: '*',
                redirect: '/',
            },
        ]
    );
}

/*
 * 初始化路由，并初始化APP
 */
function initApp(res) {
    console.log('res: ', res);
    initRouter(res);
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
}

/*
 * 获取当前用户信息，再初始化APP
 */
api.sendAjax({
    url: '/common/index',
}).then(initApp).catch(initApp)
