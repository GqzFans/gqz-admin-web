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
        path: '/',
        component: resolve => require(['../views/index'], resolve),
        children: [
        ]
    },
    {
        path: '*',
        meta: {
            noRequestApprove: true
        },
        component: resolve => require(['../views/error/404'], resolve)
    }
];
