import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store/store'
import * as types from './store/types'
import Header from './projectView/header.vue'
import caseManage from './projectView/apiMessage/apiMsg.vue'
import moduleInfo from './projectView/moduleManage/module.vue'
import uiCaseStepManager from './projectView/uiCaseStepManage/uiCaseStepInfo.vue'
import uiCaseManager from './projectView/uiCaseManage/uiCaseInfo.vue'
import uiRunManager from './projectView/uiRunManage/uiRunManage.vue'
import deviceInfo from './projectView/device/deviceInfo.vue'//设备信息页面
import uiCaseGather from './projectView/uiCaseGatherManage/uiCaseGather.vue'//用例集
// import caseEditGather from './projectView/uiCaseGatherManage/caseEditGather.vue'
import manage from './projectView/manage.vue'
import projectManage from './projectView/project/project.vue'
import platformManage from './projectView/project/platform.vue'
import reportManage from './projectView/report/report.vue'
import reportUiManage from './projectView/report/report_ui.vue'
import reportShow from './projectView/report/reportShow.vue'
import uiTestReport from './projectView/report/uiTestReport.vue'//ui测试报告
import uiReportHeader from './projectView/report/uiReportHeader'
import resultSummary from './projectView/report/resultSummary.vue'
import resultDetail from './projectView/report/resultDetail.vue'
import resultCaseSet from './projectView/report/resultCaseSet.vue'
import reportHeader from './projectView/report/reportHeader.vue'
import buildInFunc from './projectView/buildInFunc/buildInFunc.vue'
import sceneManage from './projectView/caseManage/case.vue'
import caseInfo from './projectView/caseManage/caseInfo.vue'
import caseSetView from './projectView/caseManage/caseView.vue'
import moduleInfoView from './projectView/apiMessage/moduleInfoView.vue'
import testTool from './projectView/testTool/testTool.vue'
import taskManage from './projectView/taskManage/task.vue'
import user from './projectView/userManage/user.vue'
import sceneConfig from './projectView/config/config.vue'
import login from './login/login.vue'
import projectManageUI from './projectView/project/project_ui.vue'
import errors from './login/errors.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/manage/projectManage',
    },
    {
        path: '/manage',
        // component:caseManage,
        component: manage,

        children: [
             {
                path: 'projectManage',
                // component:caseManage,
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: projectManage,
                }
            },
            {
                path: 'projectManageUI',
                // component:caseManage,
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: projectManageUI,
                }
            },
            {
                path: 'moduleInfo',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: moduleInfo,
                }
            },
            {
                path: 'moduleInfoView',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: moduleInfoView,
                }
            },
            {
                path: 'caseSetView',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: caseSetView,
                }
            },
            {
                path: 'platformManage',
                // component:caseManage,
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: platformManage,
                }
            },

            {
                path: 'sceneConfig',
                // component:caseManage,

                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: sceneConfig,
                }
            },
            {
                path: 'caseManage',
                meta: {
                    requireAuth: true,
                },
                // component:caseManage,
                components: {
                    Header: Header,
                    Manage: caseManage,
                }
            },
            {
                path: 'uiCaseStepManager',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: uiCaseStepManager,
                }
            },
            {
                path: 'uiCaseManager',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: uiCaseManager,
                }
            },
            {
                path: 'uiCaseGather',//用例集路由
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: uiCaseGather,
                }
            },
            //uiRunManager
            {
                path: 'uiRunManager',//用例集路由
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: uiRunManager,
                }
            },
            {
                path: 'deviceInfo',//设备信息
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: deviceInfo,
                }
            },
            {
                path: 'reportManage',
                meta: {
                    requireAuth: true,
                },
                // component:caseManage,
                components: {
                    Header: Header,
                    Manage: reportManage,
                },
            },
            {
                path: 'reportUiManage',
                meta: {
                    requireAuth: true,
                },
                // component:caseManage,
                components: {
                    Header: uiReportHeader,
                    Manage: reportUiManage,
                },
            },
            {
                path: 'reportShow',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: reportHeader,
                    Manage: reportShow,
                }
            },
            {
                path: 'uiTestReport',
                // redirect: '/manage/uiTestReport',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: uiReportHeader,
                    Manage: uiTestReport,
                }
            },
            {
                path: 'resultSummary',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: reportHeader,
                    Manage: resultSummary,
                }
            },
            {
                path: 'resultDetail',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: reportHeader,
                    Manage: resultDetail,
                }
            },
            {
                path: 'resultCaseSet',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: reportHeader,
                    Manage: resultCaseSet,
                }
            },
            {
                path: 'buildInFunc',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: buildInFunc,
                }
            },
            {
                path: 'sceneManage',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: sceneManage,
                }
            },
            {
                path: 'caseInfo',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: caseInfo,
                }
            },
            {
                path: 'testTool',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: testTool,
                }
            },
            {
                path: 'userManage',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: user,
                }
            },
            {
                path: 'taskManage',
                meta: {
                    requireAuth: true,
                },
                components: {
                    Header: Header,
                    Manage: taskManage,
                }
            },
            {
                path: '',
                // component:caseManage,
                // meta: {
                //     requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                // },
                components: {
                    Header: Header,
                    Manage: projectManage,
                },
                meta: {
                    title: '首页入口'
                }
            },
        ],

    },
    {
        path: '/login',
        // component:caseManage,
        component: errors,
    },
    {
        path: '/errors',
        component: errors,
    },

    {
        path: '',
        // component:caseManage,
        redirect: '/manage'

    },

];

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
    // store.commit(types.LOGIN, '1111')
}
if (window.localStorage.getItem('roles')) {
    store.commit(types.ROLES, window.localStorage.getItem('roles'));
    // store.commit(types.LOGIN, '1111')
}
if (window.localStorage.getItem('userName')) {
    store.commit(types.USERNAME, window.localStorage.getItem('userName'));
    // store.commit(types.LOGIN, '1111')
}


const router = new VueRouter({
    // mode: 'history', //去掉路径中的#
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        next();
        // if (store.state.token) {
        //     next();
        // }
        // else {
        //     next({
        //         path: '/errors',
        //         // query: {redirect: to.fullPath}
        //     })
        // }
    }
    else {
        next();
    }
});

export default router;
