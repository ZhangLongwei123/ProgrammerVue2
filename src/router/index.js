import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/auditcourse',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Course/courseaudit'),
                    meta: { title: '审核课程管理' }
                },
                {
                    path: '/recomcourse',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Course/recommendcourse.vue'),
                    meta: { title: '推荐课程管理' }
                },
                {
                    path: '/teainfo',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Teacher/TeacherInfo.vue'),
                    meta: { title: '推荐讲师管理' }
                },
                {
                    path: '/account',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Account/account.vue'),
                    meta: { title: '账号管理' }
                },
                {
                    path: '/coursetype',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Course/coursetype.vue'),
                    meta: { title: '课程类型管理' }
                },
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                },
                {
                    path:'/dept',
                    component: () => import('../components/page/dept/dept'),
                    meta: { title: '部门管理' }
                },
                {
                    path:'/position',
                    component: () => import('../components/page/dept/position'),
                    meta: {title: '职位管理'}
                },
                {
                    path: '/report',
                    component: () => import('../components/page/report/report'),
                    meta: {title: '举报课程处理'}
                },
                {
                    path: '/order',
                    component: () =>import('../components/page/Order/order'),
                    meta: {title: '订单管理'}
                },
                {
                    path:'/employee',
                    component: () => import('../components/page/dept/employee'),
                    meta: {title:'员工管理'}
                },
                {
                    path:'/financial',
                    component: () => import('../components/page/Financial/financial'),
                    meta: {title:'财务中心 '}
                },
                {
                    path:'/entryrecord',
                    component: () => import('../components/page/Entryrecord/entryrecord'),
                    meta: {title:'入驻记录 '}
                },
                {
                    path:'/commission',
                    component: () => import('../components/page/Commission/commission'),
                    meta: {title:'讲师提现记录 '}
                },
                {
                    path:'/bansealing',
                    component: () => import('../components/page/Bansealing/bansealing'),
                    meta: {title:'禁封记录 '}
                },
                {
                    path:'/evaluate',
                    component: () => import('../components/page/Evaluate/evaluate'),
                    meta: {title:'用户评价讲师 '}
                },
                {
                    path:'/evaluateCourse',
                    component: () => import('../components/page/Evaluate/evaluateCourse'),
                    meta: {title:'用户评价课程 '}
                },
                {
                    path:'/Coursepopularitylist',
                    component: () => import('../components/page/Platformstatistics/Coursepopularitylist'),
                    meta: {title:'课程热度榜 '}
                }
                ,
                {
                    path:'/CollectionCourse',
                    component: () => import('../components/page/CollectionCourse/collectionCourse'),
                    meta: {title:'收藏榜 '}
                }
                ,
                {
                    path:'/TeacherTop',
                    component: () => import('../components/page/TeacherTop/teacherTop'),
                    meta: {title:'讲师排行榜 '}
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
