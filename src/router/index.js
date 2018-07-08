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
        path: '*',
        meta: {
            noRequestApprove: true
        },
        component: resolve => require(['../views/error/404'], resolve)
    }
];
