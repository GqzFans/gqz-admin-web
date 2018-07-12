import Vue from 'vue';
import MyCookies from './MyCookies';
import MyToken from './MyToken';
export default function LogOut(Invalid, isRequest = true) {
    if (isRequest) {
        Vue.prototype.$http({
            method: 'post',
            url: '/api/uac/auth/login/logout'
        }).then((res) => {
            console.log('log out = ', res);
            clearAndOut(Invalid);
        }).catch((err) => {
            console.log(err);
        });
    } else {
        clearAndOut(Invalid);
    }
};

function clearAndOut(Invalid) {
    MyCookies.remove('info');
    MyToken.remove();
    let logInLink = window.location.origin + '/login';
    Invalid ? (logInLink += '&Invalid=true') : false;
    window.location.href = logInLink;
}
