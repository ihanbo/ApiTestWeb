<template>
    <div>
        <el-menu
            :default-active="navigationName"  
            class="el-menu-demo"
            mode="horizontal"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true">
            <el-submenu index="1">
                <template slot="title">服务端自动化测试</template>
                <el-menu-item index="/manage/projectManage" exact>项目管理</el-menu-item>
                <el-menu-item index="/manage/caseInfo">用例管理</el-menu-item>
                <el-menu-item index="/manage/moduleInfo">接口管理</el-menu-item>
                <el-submenu index="1-4">
                    <template slot="title">其他方法</template>
                    <el-menu-item index="/manage/buildInFunc">内置方法</el-menu-item>
                    <el-menu-item index="/manage/sceneConfig">业务配置</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">客户端自动化测试</template>
                <el-menu-item index="/manage/projectManageUI">项目管理</el-menu-item>
                <el-menu-item index="/manage/platformManage">应用平台</el-menu-item>
                <el-menu-item index="/manage/deviceInfo">设备信息</el-menu-item>
                <el-menu-item index="/manage/uiCaseStepManager">case步骤</el-menu-item>
                <el-menu-item index="/manage/uiCaseManager">case信息</el-menu-item>
                <el-menu-item index="/manage/uiCaseGather">case用例集</el-menu-item>
                <el-menu-item index="/manage/reportUiManage">UI测试报告</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">报告管理</template>
                <el-menu-item index="/manage/resultSummary">执行概况</el-menu-item>
                <el-menu-item index="/manage/resultDetail">执行详细</el-menu-item>
                <el-menu-item index="/manage/reportManage">测试报告</el-menu-item>
                <el-menu-item index="/manage/taskManage">定时任务</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">系统设置</template>
                <el-menu-item index="/manage/userManage">用户管理</el-menu-item>
            </el-submenu>
        </el-menu>
        <!-- 页面信息 -->
        <el-container>
            <!-- <el-header style="height: 40px;">
                <router-view class="view one" name="Header"></router-view>
            </el-header> -->
            <el-main>
                <router-view class="view two" name="Manage" style="font-family: Arial"></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'manage',    
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        navigationName:'/manage/projectManage',
        collapsed:false,//左侧管理栏收缩与否，默认为false
        role:'',
        userName:'',
      };
    },
    methods: {
        collapse: function () {
            this.collapsed = !this.collapsed;
        },
        closeNavigation(){
            this.role = this.$store.state.roles;
            this.userName = this.$store.state.userName;

            this.navigationName = this.$route.path;
            if(this.$route.path === '/manage/reportShow'){
                this.collapsed = true;
            }
        }
    },
    watch: {
        "$route": function (to) {

            if (to.path === '/manage/reportShow'){
                this.collapsed = true
            }
            //from 对象中包含当前地址
            //to 对象中包含目标地址
            //其实还有一个next参数的，这个参数是控制路由是否跳转的，如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
        }
    },
    mounted() {
        this.closeNavigation()
    },
}
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        background-color:#304156;
    }
    .menu-toggle {
        background: #434650;
        text-align: center;
        color: white;
        height: 26px;
        line-height: 30px;
    }
    .specialList {
        max-height: 948px;
    }
    .el-menu {
        border-right: solid 0px #e6e6e6;
    }
    /* 去掉导航栏底下的白边 */
    .el-menu.el-menu--horizontal{
        border-bottom: none;
    }
    .el-footer {
        background-color: #8db7ef;
        color: #333;
        text-align: left;
        line-height: 30px;
    }

    .el-aside {
        background-color: #545c64;
        color: #333;
        text-align: left;
        line-height: 200px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
        margin-bottom: 10px;
    }
    .search-style {
        background-color: #f5f5f5;
        padding-top: 10px;
    }
    .el-main {
        color: #333;
        text-align: left;
        line-height: 20px;
        padding: 0 0 20px 0;
    }

    /*.el-tabs--top .el-tabs__item.is-top:nth-child(2){*/
    /*padding-left:5px;*/
    /*}*/
    .el-button--mini {
        padding: 5px 9px;
    }

    .el-tabs__header {
        margin: 0;
    }
    .row-bg {
        padding: 5px 0;
    }

    .el-breadcrumb {
        line-height: 3;
    }

    .el-dialog__header {
        padding: 2px 10px 2px;
        background-color: #f5f7fa;
        border-radius: 5px;
    }
    .el-dialog__body {
        padding: 5px 10px;
    }
    .el-dialog__title {
        color: #6a6d71;
        font-size: 15px;
    }
    .el-dialog__headerbtn {
        top: 6px;
        right: 15px;
    }

    .el-input--mini .el-input__inner {
        line-height: 20px;
    }

    /*分页的基本样式*/
    .pagination {
        float: right;
        position: relative;
        margin-right: 40px;
    }

    /**/
    .table_padding {
        padding-left: 10px;
        padding-right: 5px;
    }

    /*改变el-table的默认滚动条样式*/
    .el-table__body-wrapper::-webkit-scrollbar {
        width: 6px;
        height: 10px;
    }
    .el-table__body-wrapper::-webkit-scrollbar-thumb {
        background-color: rgba(69, 100, 160, 0.3);
        border-radius: 4px;
    }

    .ace_scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    /*改变ace的默认滚动条样式*/
    .ace_scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(138, 135, 135, 0.3);
        border-radius: 4px;
    }

    /*改变代码编辑器左边的行数宽度*/
    .CodeMirror-gutter {
        width: 40px;
    }

    /* 改变下拉菜单的高度*/
    .el-popper[x-placement^="bottom"] {
        margin-top: 5px;
    }
    .el-textarea__inner {
        overflow-y: hidden;
    }
    .el-header{
        background-color: #072140;
    }
</style>
