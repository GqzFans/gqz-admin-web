export default [
    {
        name: 'Main',
        path: '/',
        redirect: {name: 'index'}
    },
    {
        meta: {
            name: '首页',
            requestAuth: true
        },
        name: 'index',
        path: '/index',
        redirect: {name: 'dashboard'},
        component: resolve => require(['../views/index'], resolve),
        children: [
            {
                meta: {
                    name: '主页',
                    keepAlive: true,
                    auth: true
                },
                name: 'dashboard',
                path: '/dashboard',
                component: resolve => require(['../views/dashboard/index'], resolve)
            },
            {
                meta: {
                    name: '图片管理',
                    keepAlive: true,
                    auth: true
                },
                name: 'contentImage',
                path: '/content/toImage',
                component: resolve => require(['../views/content/toImageIndex'], resolve)
            },
            {
                meta: {
                    name: '图片上传',
                    keepAlive: false,
                    auth: true
                },
                name: 'contentImageUpload',
                path: '/content/toImageUpload',
                component: resolve => require(['../views/content/toImageUpload'], resolve)
            },
            {
                meta: {
                    name: '表情包管理',
                    keepAlive: true,
                    auth: true
                },
                name: 'contentEmoticon',
                path: '/content/toEmoticon',
                component: resolve => require(['../views/content/toEmoticonIndex'], resolve)
            },
            {
                meta: {
                    name: '表情包上传',
                    keepAlive: false,
                    auth: true
                },
                name: 'contentEmoticonUpload',
                path: '/content/toEmoticonUpload',
                component: resolve => require(['../views/content/toEmoticonUpload'], resolve)
            },
            {
                meta: {
                    name: '用户管理',
                    keepAlive: false,
                    auth: true
                },
                name: 'userManagementIndex',
                path: '/system/toUserManagement',
                component: resolve => require(['../views/system/toUserManagementIndex'], resolve)
            }
        ]
    },
    {
        meta: {
            name: '登录'
        },
        name: 'login',
        path: '/login',
        component: resolve => require(['../views/login/index'], resolve)
    },
    {
        path: '*',
        meta: {
            noRequestApprove: true
        },
        component: resolve => require(['../views/error/404'], resolve)
    }
];
