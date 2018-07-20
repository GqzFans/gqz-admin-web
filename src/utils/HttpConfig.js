let NODE_ENVS = process.env.NODE_ENV;
/**
 * 按照环境，获取后台API地址
 * @returns {{apiBaseUrl: string}}
 */
export default class HttpConfig {
    getHomeProjectLink() {
        // 后台API地址
        let apiBaseUrl = '';
        switch (NODE_ENVS) {
            case 'production':
                apiBaseUrl = 'http://api.gaoqiuzi.cn';
            default:
                apiBaseUrl = '';
        }
        return apiBaseUrl;
    }
}
