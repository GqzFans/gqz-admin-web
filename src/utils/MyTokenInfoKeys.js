export default {
    getEnv() {
        let tokenKey = null;
        let infoKey = null;
        let isDev = false;
        switch (process.env.NODE_ENV) {
            case 'development':
                tokenKey = 'TOKEN_KEY';
                infoKey = 'USER_INFO';
                isDev = true;
                break;
            case 'production':
                tokenKey = 'TOKEN_KEY';
                infoKey = 'USER_INFO';
                break;
            default:
                break;
        }
        return {
            'token': tokenKey,
            'info': infoKey,
            'dev': isDev
        };
    }
};
