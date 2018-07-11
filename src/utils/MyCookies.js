import Cookie from 'js-cookie';
import TokenInfoKeys from './MyTokenInfoKeys';
export default {
    domainUrl: '.dragon-yuan.me',
    tokenInfoKeys: TokenInfoKeys.getEnv(),
    set(key, val) {
        if (this.tokenInfoKeys.dev) {
            Cookie.set(this.tokenInfoKeys[key], val);
            return;
        }
        Cookie.set(this.tokenInfoKeys[key], val, {domain: this.domainUrl});
    },

    get(key, noParse) {
        if (this.tokenInfoKeys.dev) {
            return noParse ? Cookie.get(this.tokenInfoKeys[key]) : JSON.parse(Cookie.get(this.tokenInfoKeys[key]));
        }
        return noParse ? Cookie.get(this.tokenInfoKeys[key], {domain: this.domainUrl}) : JSON.parse(Cookie.get(this.tokenInfoKeys[key], {domain: this.domainUrl}));
    },

    remove(key) {
        if (this.tokenInfoKeys.dev) {
            Cookie.remove(this.tokenInfoKeys[key]);
        }
        Cookie.remove(this.tokenInfoKeys[key], {domain: this.domainUrl});
    },
    // 全局取当前环境的cookie
    getNowCookie() {
        let NODE_ENVS = process.env.NODE_ENV;
        let token = null;
        let userInfo = null;
        let reUserInfo = null;
        switch (NODE_ENVS) {
            case 'development':
                token = Cookie.get('TOKEN_KEY');
                userInfo = Cookie.get('USER_INFO');
                break;
            case 'production':
                token = Cookie.get('TOKEN_KEY');
                userInfo = Cookie.get('USER_INFO');
                break;
            default :
                token = Cookie.get('TOKEN_KEY');
                userInfo = Cookie.get('USER_INFO');
        }
        if (!userInfo || !token) {
            token = null;
            reUserInfo = null;
        } else {
            if (userInfo.indexOf('\\') >= 0) {
                var userInfoObj = userInfo.replace(/\\/g, '');
                if (userInfoObj) {
                    reUserInfo = JSON.parse(userInfoObj);
                }
            } else {
                if (userInfo) {
                    reUserInfo = JSON.parse(userInfo);
                }
            }
        }
        return {
            token: token, // String
            userInfo: reUserInfo // Object
        };
    }
};



