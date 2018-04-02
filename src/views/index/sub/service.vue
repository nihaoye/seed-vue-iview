<style scoped>
    .service-container {
        position: relative;
        padding-top: 55px;
    }
    .service-title-bg {
        position: absolute;
        top: 0;
        width: 100%;
        padding-top: 35%;
        background: url(../img/service-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    .service-title-container {
        position: relative;
        font-weight: lighter;
        text-align: center;
    }
    .service-title {
        font-size: 32px;
        color: #fff;
        margin-bottom: 23px;
    }
    .service-detail {
        font-size: 16px;
        color: #FFFFFF;
        line-height: 34px;
        opacity: 0.7;
    }
    .service-step {
        position: relative;
        width: 86%;
        padding: 83px 8%;
        margin: 50px 7% 0;
        background: #fff;
        box-shadow: 0 10px 60px 0 rgba(7,61,125,0.10);
        overflow: hidden;
    }
    .service-item {
        float: left;
        width: 25%;
        text-align: center;
    }
    .service-item a {
        text-decoration: none;
        display: block;
    }
    .item-title {
        margin: 24px 0;
        font-size: 20px;
        color: #4A4A4A;
        font-weight: 400;
    }
    .intro {
        opacity: 0.4;
        font-size: 14px;
        color: #0D253E;
        line-height: 27px;
        font-weight: 400;
        cursor: pointer;
    }
    .item-icon {
        display: block;
        width: 140px;
        height: 140px;
        margin: 0 auto;
        cursor: pointer;
        border-radius: 50%;
    }
    .enter .item-icon {
        background: url(../img/enter.png) no-repeat;
        background-size: 100% 100%;
    }
    .item-icon:hover {
        box-shadow: 0 10px 60px 0 rgba(7,61,125,0.10);
    }
    .enter .item-icon:hover{
        background: url(../img/hover-enter.png) no-repeat;
        background-size: 100% 100%;
    }
    .enter-schedule .item-icon {
        background: url(../img/enter-schedule.png) no-repeat;
        background-size: 100% 100%;
    }
    .enter-schedule .item-icon:hover{
        background: url(../img/hover-enter-schedule.png) no-repeat;
        background-size: 100% 100%;
    }
    .fxg-intro .item-icon {
        background: url(../img/fxg-intro.png) no-repeat;
        background-size: 100% 100%;
    }
    .fxg-intro .item-icon:hover{
        background: url(../img/hover-fxg-intro.png) no-repeat;
        background-size: 100% 100%;
    }
    .enter-ok .item-icon {
        background: url(../img/enter-ok.png) no-repeat;
        background-size: 100% 100%;
    }
    .enter-ok .item-icon:hover {
        background: url(../img/hover-enter-ok.png) no-repeat;
        background-size: 100% 100%;
    }
</style>

<template>
    <div class="service-container">
        <div class="service-title-bg"></div>
        <div class="service-title-container">
            <p class="service-title">商家服务导航</p>
            <p class="service-detail">提交入驻申请后，供应商可以通过入驻申请页面登录查看入驻申请进度，开店完成后<br/>店铺登录相关信息会通过邮件或者电话形式通知商家。</p>
        </div>
        <div class="service-step">
            <div class="service-item enter">
                <router-link
                    v-if="$store.getters.isLogin"
                    class="item-icon"
                    tag="span"
                    to="/home"
                ></router-link>
                <a
                    v-else
                    href="https://sso.toutiao.com/login/">
                    <span class="item-icon"></span>
                </a>
                <router-link
                    v-if="$store.getters.isLogin"
                    class="item-title"
                    to="/home"
                >商家入驻</router-link>
                <a
                    v-else
                    href="https://sso.toutiao.com/login/"
                    class="item-title">商家入驻</a>
                <router-link
                    v-if="$store.getters.isLogin"
                    tag="p"
                    class="intro"
                    to="/home"
                >点击进入商家注册页面，<br/>加入放心购大家庭</router-link>
                <a
                    v-else
                    href="https://sso.toutiao.com/login/"
                    class="intro">
                    点击进入商家注册页面，<br/>加入放心购大家庭
                </a>
            </div>
            <div class="service-item enter-schedule">
                <router-link
                    v-if="$store.getters.isLogin"
                    class="item-icon"
                    tag="span"
                    to="/home"
                ></router-link>
                <a
                    v-else
                    href="https://sso.toutiao.com/login/">
                    <span class="item-icon"></span>
                </a>
                <router-link
                    v-if="$store.getters.isLogin"
                    class="item-title"
                    to="/home"
                >入驻进度查询</router-link>
                <a
                    v-else
                    href="https://sso.toutiao.com/login/"
                    class="item-title">入驻进度查询</a>
                <router-link
                    v-if="$store.getters.isLogin"
                    tag="p"
                    class="intro"
                    to="/home"
                >查询入驻的进度，审核通过<br/>即可使用后台创建商品</router-link>
                <a
                    v-else
                    href="https://sso.toutiao.com/login/"
                    class="intro">
                    查询入驻的进度，审核通过<br/>即可使用后台创建商品
                </a>
            </div>
            <div class="service-item fxg-intro">
                <a
                    target="_blank"
                    href="https://www.toutiao.com/a6501532882052317709/"><span class="item-icon"></span></a>
                <a
                    target="_blank"
                    href="https://www.toutiao.com/a6501532882052317709/"
                    class="item-title">放心购介绍</a>
                <a
                    target="_blank"
                    href="https://www.toutiao.com/a6501532882052317709/"
                    class="intro">
                    依托今日头条巨量流量资源，<br/>满足头条用户对好货和好商家的深层需求。
                </a>
            </div>
            <div class="service-item enter-ok">
                <router-link
                    class="item-icon"
                    tag="span"
                    to="/index/spec"></router-link>
                <router-link
                    class="item-title"
                    to="/index/spec">招商标准</router-link>
                <router-link
                    class="intro"
                    tag="p"
                    to="/index/spec">查询自身行业所需要提交<br/>的资质和入驻要求</router-link>
            </div>
        </div>
    </div>
</template>
