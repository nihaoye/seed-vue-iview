<style scoped>
    .banner-container {
        padding-top: 46%;
        background: url(../img/banner-bg.png) no-repeat;
        background-size: cover;
        position: relative;
    }
    .fxg-login {
        position: absolute;
        left: 9%;
        top: 24%;
    }
    .info-title {
        font-size: 50px;
        margin: 0 0 20px 0;
        color: #fff;
        font-weight: 100;
    }
    .info-sub-title {
        margin: 0 0 43px 0;
        font-size: 27px;
        text-shadow: 0 2px 4px rgba(233,233,233,0.50);
        color: #fff;
        font-weight: 100;
    }
    a {
        display: block;
        text-decoration: none;
    }
    button {
        width: 330px;
        height: 50px;
        line-height: 50px;
        outline: none;
        border: none;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 100;
        background: transparent;
        color: #fff;
    }
    .invalid-tips {
        color: #fff;
    }
    .invalid-tips a {
        display: inline;
    }
    .home {
        border: 1px solid;
    }
    .btn-login {
        background-image: linear-gradient(57deg, #FF466C 0%, #FB706E 100%, #F85959 100%);
        margin-bottom: 20px;
    }
    .other-login-split {
        width: 330px;
        height: 33px;
        line-height: 33px;
        color: #fff;
        font-size: 16px;
        font-weight: 100;
        text-align: center;

    }
    .split-text {
        font-size: 18px;
        letter-spacing: 2px;
    }
    .line {
        display: inline-block;
        vertical-align: middle;
        width: 81px;
        height: 1px;
        margin: 0 5px;
        margin-bottom: 2px;
    }
    .line-left {
        background-image: linear-gradient(to right,rgba(255,255,255,0),rgba(255,255,255,1));
    }
    .line-right {
        background-image: linear-gradient(to right,rgba(255,255,255,1),rgba(255,255,255,0));
    }
    .other-login-btns {
        height: 50px;
        width: 330px;
        margin-top: 20px;
        line-height: 50px;
    }
    .other-login-btn {
        display: inline-block;
        height: 42px;
        width: 150px;
        line-height: 42px;
        text-align: center;
        border: 1px solid #fff;
        border-radius: 3px;
        color: #FFF;
        font-weight: 200;
    }
    .othlogin-icon {
        display: inline-block;
        vertical-align: text-bottom;
        width: 17px;
        height: 18px;
        margin-right: 5px;
    }
    .icon-huoshan {

        background: url(../img/icon-huoshan.png) no-repeat;
    }
    .icon-douyin {
        background: url(../img/icon-douyin.png) no-repeat;
    }
</style>

<template>
    <div class="banner-container">
        <div class="fxg-login">
            <p class="info-title">优质流量&nbsp;&nbsp;&nbsp;自主经营</p>
            <p class="info-sub-title">多种下单渠道选择精准流量更多单量</p>
            <p
                v-if="$store.getters.isLoginInValid"
                class="invalid-tips">当前账号不具有商户权限，请<a
                    href="javascript:;"
                    @click="logout">退出</a>后更换账号</p>
            <template v-if="!$store.getters.isToutiaoLogin && !$store.getters.isLoginInValid">
                <a :href="url"><button class="btn-login">立即登录放心购</button></a>
                <div class="other-login-split">
                    <span class="line line-left"></span>
                    <span class="split-text">or</span>
                    <span class="line line-right"></span>
                </div>
                <div class="other-login-btns">
                    <a
                        :href="huoshanUrl"
                        class="other-login-btn"
                        style="margin-right: 18px; margin-left: 4px">
                        <span class="othlogin-icon icon-huoshan"></span>
                        火山账号登录
                    </a>
                    <a
                        :href="douyinUrl"
                        class="other-login-btn">
                        <span class="othlogin-icon icon-douyin"></span>
                        抖音账号登录
                    </a>
                </div>
            </template>
            <router-link
                v-if="$store.getters.isToutiaoLogin"
                tag="button"
                to="/home"
                class="home">进入我的商家后台</router-link>
        </div>
    </div>
</template>

<script>
import api from 'api'

export default {
    data() {
        return {
            huoshanUrl: '',
            douyinUrl: '',
            type: '',
            come_from: '',
            url: `https://sso.toutiao.com/login/?service=${location.origin}${location.pathname}`,
        }
    },
    mounted() {
        var search = location.search
        this.type = this.getUrlParam('type', search)
        this.come_from = this.getUrlParam('come_from', search)

        var huoshanCbUrl = location.origin + location.pathname + '?user_type=huoshan' + '#/index/home';
        var douyinCbUrl = location.origin + location.pathname + '?user_type=douyin' + '#/index/home';
        this.huoshanUrl = 'https://sso.huoshan.com/login/?service=' + encodeURIComponent(huoshanCbUrl);
        this.douyinUrl = 'https://sso.douyin.com/login/?service=' + encodeURIComponent(douyinCbUrl);

        if(!this.type) return;

        if (this.$store.getters.isToutiaoLogin) {
            var data = {}
            if(this.type && this.come_from) {
                data.type = this.type
                data.come_from = this.come_from
            } else if (this.type.indexOf('-') > 0 && !this.come_from) {
                var params = location.search.split('=')[1].split('-') || []

                data.type = params[0]
                data.come_from = params[1]
            } else {
                data.type = this.type
            }

            api.supplyer.saveComeFrom(data).done(function() {
                console.log('come_from保存成功')
            }.bind(this))

        } else {
            var remakeUrl = location.origin + location.pathname + '?type=' + this.type + '#/index/home'
            if(this.come_from) {
                remakeUrl = location.origin + location.pathname + '?type=' + this.type + '-' + this.come_from + '#/index/home'
            }
            this.url = 'https://sso.toutiao.com/login/?service=' + encodeURIComponent(remakeUrl)
        }
    },
    methods: {
        getUrlParam(key, url) {
            var str = url;
            str = str.substring(1,str.length);
            var arr = str.split("&");
            var obj = {};

            for(var i = 0; i < arr.length; i++) {
                var tmp_arr = arr[i].split("=");
                obj[tmp_arr[0]] = tmp_arr[1];
            }
            return obj[key];
        },
        logout() {
            api.logout();
        },
    },
}
</script>
