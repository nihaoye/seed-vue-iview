<template>
    <div :class="helloa.hello">
        <h1 @click="messageHello">{{ msg }}<span>hahhahaha</span></h1>
        <p>
            For guide and recipes on how to configure / customize this project,<br> check out the
            <a
                href="https://github.com/vuejs/vue-cli/tree/dev/docs"
                target="_blank">vue-cli documentation</a>.
        </p>
        <h3 :class="worldb.hello">Installed CLI Plugins</h3>
        <ul>
            <li><a
                href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
                target="_blank">babel</a></li>
            <li><a
                href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
                target="_blank">eslint</a></li>
            <li><a
                href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha"
                target="_blank">unit-mocha</a></li>
            <li><a
                href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch"
                target="_blank">e2e-nightwatch</a></li>
        </ul>
        <h3>Essential Links</h3>
        <ul>
            <li><a
                href="https://vuejs.org"
                target="_blank">Core Docs</a></li>
            <li><a
                href="https://forum.vuejs.org"
                target="_blank">Forum</a></li>
            <li><a
                href="https://chat.vuejs.org"
                target="_blank">Community Chat</a></li>
            <li><a
                href="https://twitter.com/vuejs"
                target="_blank">Twitter</a></li>
        </ul>
        <h3>Ecosystem</h3>
        <ul>
            <li><a
                href="https://router.vuejs.org/en/essentials/getting-started.html"
                target="_blank">vue-router</a></li>
            <li><a
                href="https://vuex.vuejs.org/en/intro.html"
                target="_blank">vuex</a></li>
            <li><a
                href="https://github.com/vuejs/vue-devtools#vue-devtools"
                target="_blank">vue-devtools</a></li>
            <li><a
                href="https://vue-loader.vuejs.org/en"
                target="_blank">vue-loader</a></li>
            <li><a
                href="https://github.com/vuejs/awesome-vue"
                target="_blank">awesome-vue</a></li>
        </ul>
        <div>
            <img
                src1="/src/assets/logo.png"
                alt="图片1">
            <img
                src="~src/assets/logo.png"
                alt="图片5">
            <img
                src1="/assets/logo.png"
                alt="图片11">
            <img
                src="../assets/logo.png"
                alt="图片13">
            <img
                src1="assets/logo.png"
                alt="图片14">
            <img
                src="~assets/logo.png"
                alt="图片15">
        </div>

        <div>{{ result }}</div>
    </div>
</template>

<script>
import Vue from 'vue'
import api from 'api'

export default {
    name: 'HelloWorld',
    props: {
        msg: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            result: {
                name: 'hgm',
                age: 123,
            },
        }
    },
    mounted() {
        api.goods.getGoodsList({}, 1, 2).then((res) => {
            this.result = res.data;
        }).catch(e => {
            console.log(e)
        })
    },
    methods: {
        messageHello() {
            console.log('HelloWorld');
            Vue.prototype.$Message.error('操作失败了')
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module="helloa" lang="scss">
.hello {
    background: green;

    h1 {
        display: flex;
        background: red;
        transform: translate3d(0,0,0);
        box-sizing: border-box;
        box-shadow: 0 0 1px 1px 9px red;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;

        span {
            color: green;
        }
    }

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
}
</style>

<style module="worldb" lang="scss">
.hello {
    background: purple;
}
</style>
