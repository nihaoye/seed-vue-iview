<style scoped>
    .question-container {
        padding-bottom: 180px;
        margin-top: 92px;
        text-align: center;
        overflow: hidden;
    }
    .question-title {
        font-size: 32px;
        color: #8E8E8E;
        margin-bottom: 21px;
        font-weight: 300;
    }
    .question-intro {
        margin: 24px 0 42px 0;
        opacity: 0.7;
        font-size: 16px;
        color: #8E8E8E;
        line-height: 34px;
    }
    .question-list {
        margin: 42px 12% 180px;
    }
    .question-list>li {
        float: left;
        width: 48%;
    }
    .question-list .credit-question {
        margin-right: 4%;
    }
    .classify {
        position: relative;
        padding-top: 50%;
        font-size: 30px;
        color: #FFFFFF;
        text-align: center;
        border-radius: 4px 4px 0 0;
        font-weight: 300;
    }
    .classify p {
        text-align: left;
        position: absolute;
        top: 32%;
        left: 11%;
    }
    .credit-question .classify {
        background: #E95560;
        box-shadow: 0 2px 30px 0 rgba(248,89,89,0.30);
    }
    .flow-question .classify {
        background: #FFCC01;
        box-shadow: 0 2px 30px 0 rgba(255,204,1,0.30);
    }
    .classify-content {
        padding: 7% 12%;
        width: 100%;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
        box-shadow: 0 20px 60px 10px rgba(13,37,62,0.05);
        border-radius: 4px;
    }
    .classify-content li {
        opacity: 0.9;
        line-height: 30px;
        text-align: left;
        margin-bottom: 16px;
    }
    .classify-content li a {
        font-size: 16px;
        color: #4A4A4A;
    }
    .classify-icon {
        position: absolute;
        top: 50%;
        margin-top: -60px;
        width: 121px;
        height: 121px;
        margin-left: 16%;
    }
    .credit-question .classify-icon {
        background: url(../img/question-credit.png) no-repeat;
        background-size: 100% 100%;
    }
    .flow-question .classify-icon {
        background: url(../img/question-schedule.png) no-repeat;
        background-size: 100% 100%;
    }
</style>

<template>
    <div class="question-container">
        <div class="question-title">常见问题</div>
        <p class="question-intro">入驻放心购所有问题全解答</p>
        <ul class="question-list">
            <li class="credit-question">
                <div class="classify">
                    <p>入驻资质问题<br/>Q&A</p>
                    <span class="classify-icon"></span>
                </div>
                <ul class="classify-content">
                    <li><a 
                        target="_blank" 
                        href="http://www.toutiao.com/i6469710930123948558/">1.店铺入驻需要准备哪些材料？</a></li>
                    <li><a 
                        target="_blank" 
                        href="http://www.toutiao.com/i6469712563641778701/">2.店铺资质需要哪些？</a></li>
                    <li><a 
                        target="_blank" 
                        href="http://www.toutiao.com/i6471123597074104845/">3.怎么入驻放心购？</a></li>
                </ul>
            </li>
            <li class="flow-question">
                <div class="classify">
                    <p>入驻流程问题<br/>Q&A</p>
                    <span class="classify-icon"></span>
                </div>
                <ul class="classify-content">
                    <li><a 
                        target="_blank" 
                        href="http://www.toutiao.com/i6469710328421679629/">1.商家如何查询入驻进度？</a></li>
                    <li><a 
                        target="_blank" 
                        href="http://www.toutiao.com/i6469716330760110605/">2.合同流程怎么走？</a></li>
                    <li><a 
                        target="_blank" 
                        href="https://www.toutiao.com/a6501883050392027662/">3.其他入驻流程问题？</a></li>
                </ul>
            </li>
        </ul>
    </div>
</template>
