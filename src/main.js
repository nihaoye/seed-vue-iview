import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'iview/dist/styles/iview.css';

import api from 'api'

Vue.config.productionTip = false

function initRouter(res) {
    router.addRoutes(res.data.data.menu.map(function(item) {
        var c = item.component;
        item.component = resolve => require(['./views' + c + '.vue'], resolve);
        return item;
    }));
    router.addRoutes(
        [{
            path: '*',
            redirect: '/home',
        }]
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
