import Vue from 'vue';
import App from './App';
// Router
import VueRouter from 'vue-router';
import routes from './router';
// Ajax
import axios from 'axios';
import MyToken from 'src/utils/MyToken';
import EncryptUtil from 'src/utils/EncryptUtil';
// UI
import 'element-ui/lib/theme-chalk/index.css';
// 按需引入组件
import {
    Header,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Row,
    Col,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Card,
    Carousel,
    CarouselItem,
    Table,
    TableColumn,
    Collapse,
    CollapseItem,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Input,
    DatePicker,
    Button,
    ButtonGroup,
    Pagination,
    Alert,
    Upload,
    Dialog,
    Progress,
    MessageBox,
    Message,
    Notification
} from 'element-ui';
const components = [
    Header,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Row,
    Col,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Card,
    Carousel,
    CarouselItem,
    Table,
    TableColumn,
    Collapse,
    CollapseItem,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Input,
    DatePicker,
    Button,
    ButtonGroup,
    Pagination,
    Alert,
    Upload,
    Dialog,
    Progress,
    MessageBox,
    Message,
    Notification
];

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
// 加密方式
Vue.prototype.$encrypto = new EncryptUtil();

components.map(component => {
    Vue.component(component.name, component);
});

// Vue启用组件
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

// ajax
Vue.prototype.$http = axios.create({
    timeout: 60000
});

// POST传参序列化
Vue.prototype.$http.interceptors.request.use((config) => {
    if (config.method === 'POST' || config.method === 'post') {
        let token = MyToken.get();
        token && (config.headers.Authorization = token);
        return config;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// code状态码200判断
Vue.prototype.$http.interceptors.response.use((res) => {
    // TODO 续租
    if (res.data.code !== 200) {
        if (res.data.code === 100009 || res.data.code === 100010 || res.data.code === 100006 || res.data.code === 403) {
            // TOKEN解析失败 || 操作频率过快, 您的帐号已被冻结 || 会话超时,请刷新页面重试 || jwt验签失败,DTO为空
            Message.error(res.data.message);
            // LogOut();
            window.location.href = '';
            return Promise.reject(res);
        } else {
            Message.error(res.data.message);
            return Promise.reject(res);
        }
    } else {
        return res.data;
    }
}, (error) => {
    Message.error(error.toString());
    return Promise.reject(error);
});

// 自定义全局变量
const domainInfo = '高秋梓资源站管理系统';
Vue.prototype.GLOBAL_DOMAIN_INFO = domainInfo;
// Main
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
