<style media="screen">
    .ivu-layout-sider .ivu-layout-sider-zero-width-trigger {
        position: fixed;
        left: 200px;
        top: 64px;
    }
    .ivu-layout-sider.ivu-layout-sider-zero-width.ivu-layout-sider-collapsed .ivu-layout-sider-zero-width-trigger {
        left: 0;
    }
</style>
<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        position: fixed;
        z-index: 999;
        left: 0;
        right: 0;
        padding: 0 20px;
        background: #495060;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo {
        font-size: 20px;
        height: 64px;
        line-height: 64px;
        padding: 0 20px;
        background: #596073;
    }
    .layout-logo:hover {
        background: #646c82 !important;
    }
    .layout-logo.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
        color: #fff;
        border-right: 0;
        background: #646c82 !important;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider
                :style="{height: '100vh', overflow: 'auto', zIndex: '9999'}"
                :collapsed-width="78"
                v-model="isCollapsed"
                breakpoint="md"
                collapsible
            >
                <Menu
                    :open-names="['1']"
                    :class="menuitemClasses"
                    active-name="1-2"
                    theme="dark"
                    width="auto"
                >
                    <MenuItem
                        name="0"
                        class="layout-logo">放心购联盟系统</MenuItem>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </template>
                        <MenuItem name="1-1">Option 1</MenuItem>
                        <MenuItem name="1-2">Option 2</MenuItem>
                        <MenuItem name="1-3">Option 3</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </template>
                        <MenuItem name="2-1">Option 1</MenuItem>
                        <MenuItem name="2-2">Option 2</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </template>
                        <MenuItem name="3-1">Option 1</MenuItem>
                        <MenuItem name="3-2">Option 2</MenuItem>
                    </Submenu>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout :style="{height:'100vh'}">
                <Header class="layout-header-bar">
                    <Menu
                        mode="horizontal"
                        theme="dark"
                        active-name="1">
                        <div class="layout-nav">
                            <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                            </MenuItem>
                            <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                            </MenuItem>
                            <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                            </MenuItem>
                            <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                            </MenuItem>
                        </div>
                    </Menu>
                </Header>
                <Content :style="{margin: '74px 10px 10px 10px', padding: '10px', background: '#fff', minHeight: '220px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isCollapsed: false,
        };
    },
    computed: {
        menuitemClasses: function () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : '',
            ]
        },
    },
    mounted() {
        // alert(123);
    },
}
</script>
