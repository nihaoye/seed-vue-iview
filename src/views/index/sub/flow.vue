<style scoped>
    .flow-container {
        margin-top: 92px;
        text-align: center;
    }
    .flow-title, .flow-intro {
        font-weight: 300;
    }
    .flow-title {
        font-size: 32px;
        color: #8E8E8E;
        margin-bottom: 24px;
    }
    .flow-intro {
        margin: 24px 0 42px 0;
        opacity: 0.7;
        font-size: 16px;
        color: #8E8E8E;
        line-height: 34px;
    }
    .flow-step {
        padding: 45px 0;
        overflow: hidden;
        background-color: #fff;
        margin: 0;
    }
    .flow-step li {
        float: left;
        width: 25%;
        height: 225px;
        padding: 10px 5% 0;
        border-right: 1px solid #D8D8D8;
        text-align: left;
    }
    .flow-step p {
        font-size: 15px;
        color: #4A4A4A;
        margin: 0;
        margin-bottom: 11px;
    }
    .flow-step .step-title {
        font-size: 26px;
        color: #4A4A4A;
        margin-bottom: 12px;
        font-weight: 400;
    }
    .step-title span {
        display: inline-block;
        width: 39px;
        font-family: HelveticaNeue-Medium;
        font-size: 48px;
        color: #4A4A4A;
        margin-right: 10px;
    }
    .flow-guide {
        padding-top: 20%;
        position: relative;
        background: url(../img/flow-guide-bg.png) no-repeat;
        background-size: 100%;
    }
    .guide-content {
        position: absolute;
        top: 17%;
        width: 100%;
        text-align: center;
        font-weight: 300;
    }

    .flow-guide p {
        color: #FCFCFC;
        text-shadow: 0 2px 6px rgba(0,0,0,0.20);
    }
    .guide-title {
        font-size: 32px;
        margin-bottom: 11px;
    }
    .guide-sub-title {
        font-size: 26px;
        margin-bottom: 50px;
    }
    .go-banner {
        border: 1px solid #FFFFFF;
        border-radius: 4px;
        padding: 8px 50px;
        font-size: 16px;
        color: #FCFCFC;
        text-decoration: none;
        font-weight: 300;
    }
</style>

<template>
    <div class="flow-container">
        <div class="flow-title">入驻流程介绍</div>
        <p class="flow-intro">简单4步流程介绍帮您轻松入驻，随时开店</p>
        <ul class="flow-step">
            <li>
                <p class="step-title"><span>1</span>入驻</p>
                <p>1.点击
                    <router-link
                        v-if="$store.getters.isLogin"
                        to="/home"
                    >商家入驻</router-link>
                    <a
                        v-else
                        href="https://sso.toutiao.com/login/"></i>商家入驻</a>，注册账号
                </p>
                <p>2.提交公司，经营资质信息</p>
                <p>3.等待放心购官方审核</p>
            </li>
            <li>
                <p class="step-title"><span>2</span>保证金</p>
                <p>1.支付20000元开店保证金</p>
            </li>
            <li>
                <p class="step-title"><span>3</span>开店完成</p>
                <p>1.商家登录后台</p>
                <p>2.发布商品，店铺上线</p>
            </li>
            <li>
                <p class="step-title"><span>4</span>商品投放</p>
                <p>1.申请入驻【放心购】商城</p>
                <p>2.开通今日头条广告推荐业务</p>
                <p>3.设置自媒体商品推广业务</p>
            </li>
        </ul>
        <div class="flow-guide">
            <div class="guide-content">
                <p class="guide-title">商家入驻指引</p>
                <p class="guide-sub-title">入驻攻略五分钟帮你轻松开店</p>

                <a
                    class="go-banner"
                    href="http://www.toutiao.com/i6471123597074104845/"
                    target="_blank">点击查看</a>
            </div>
        </div>
    </div>
</template>
