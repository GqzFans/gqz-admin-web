import Vue from 'vue';
import App from './App';
// Router
import VueRouter from 'vue-router';
import routes from './router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
    mode: 'history',
    routes
});

const components = [
];

components.map(component => {
    Vue.component(component.name, component);
});

// 自定义全局变量
const domainInfo = '高秋梓资源站管理系统';
Vue.prototype.GLOBAL_DOMAIN_INFO = domainInfo;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
