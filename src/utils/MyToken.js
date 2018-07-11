import axios from 'axios';
import MyCookies from './MyCookies';
import Cookie from 'js-cookie';
import TokenInfoKeys from './MyTokenInfoKeys';
export default {
    domainUrl: '.dragon-yuan.me',
    tokenInfoKeys: TokenInfoKeys.getEnv(),
    isOut: false,
    set (val) {
        this.setTokenTime();
        MyCookies.set('token', val);
    },
    get () {
        let token = MyCookies.get('token', true);
        let date = (new Date()).getTime() - this.getTokenTime();
        if (!this.isOut && token && date > 120 * 60 * 1000) {
            this.isOut = true;
            // LogOut(true, false);
        }
        let toVoid = token && (date > 80 * 60 * 1000);
        toVoid && this.up('Bearer ' + token);
        return 'Bearer ' + token;
    },
    remove () {
        this.remTokenTime();
        MyCookies.remove('token');
    },
    up (token) {
        axios({
            headers: {'Authorization': token},
            method: 'post',
            url: '/api/uac/auth/token/getTokenAgain'
        }).then((res) => {
            this.set(res.data.result);
        }).catch((err) => {
            console.log(err);
        });
    },
    setTokenTime() {
        let date = (new Date()).getTime();
        if (this.tokenInfoKeys.dev) {
            Cookie.set(this.tokenInfoKeys['token'] + '_KEY', date);
            return;
        }
        Cookie.set(this.tokenInfoKeys['token'] + '_KEY', date, {domain: this.domainUrl});
    },
    getTokenTime() {
        if (this.tokenInfoKeys.dev) {
            return Cookie.get(this.tokenInfoKeys['token'] + '_KEY');
        }
        return Cookie.get(this.tokenInfoKeys['token'] + '_KEY', {domain: this.domainUrl});
    },
    remTokenTime() {
        if (this.tokenInfoKeys.dev) {
            Cookie.remove(this.tokenInfoKeys['token'] + '_KEY');
            return;
        }
        Cookie.remove(this.tokenInfoKeys['token'] + '_KEY', {domain: this.domainUrl});
    }
};
