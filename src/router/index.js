export default [
    {
        name: 'Index',
        path: '/',
        redirect: {name: 'index'}
    },
    {
        meta: {
            name: '首页'
        },
        name: 'index',
        path: '/index',
        component: resolve => require(['../views/index'], resolve)
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
        path: '*',
        meta: {
            noRequestApprove: true
        },
        component: resolve => require(['../views/error/404'], resolve)
    }
];
