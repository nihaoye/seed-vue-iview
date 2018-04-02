import Vue from 'vue'
import Vuex from 'vuex'

import goods from './modules/goods.js';
import order from './modules/order.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        code: 10005,
        user: {},
        menu: {},
        auth: {},
    },
    getters: {
        userName(state) {
            return state.user.user_name;
        },
        userType(state) {
            return state.user.user_type;
        },
        userId(state) {
            return state.user.user_id;
        },
        isLogin(state) {
            return state.code === 0 && state.user.user_name;
        },
        isOperator(state, getters) {
            return getters.type === 1;
        },
    },
    mutations: {
        setCode(state, code) {
            state.code = code;
        },
        setUser(state, user) {
            state.user = user;
        },
        updateUser(state, user) {
            Object.keys(user).forEach(key => {
                state.user[key] = user[key];
            });
        },
        setMenu(state, menu) {
            state.menu = menu;
        },
        setAuth(state, auth) {
            state.auth = auth;
        },
        logout(state) {
            state.code = 10005;
            state.user = {};
            state.menu = {};
            state.auth = {};
        },
    },
    modules: {
        goods,
        order,
    },
})
