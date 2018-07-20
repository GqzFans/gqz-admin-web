<style rel="stylesheet/scss" lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }
    html, body {
        height: 100%;
    }
    div:nth-child(0) {
        height: 100%;
    }
    .bg-body {
        background: url('https://gaoqiuzi-files.oss-cn-beijing.aliyuncs.com/admin-web-assets/bgi.jpg?x-oss-process=style/gzip') no-repeat;
        background-size: cover;
        height: 100%;
        width: 100%;
        position: absolute;
    }
    .in-box {
        background-color: #99a9bf;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        width: 835px;
        height: 470px !important;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .in-box-left {
        background: url('https://gaoqiuzi-files.oss-cn-beijing.aliyuncs.com/admin-web-assets/lv-gqz.png?x-oss-process=style/gzip') no-repeat -180px 0;
        background-size: cover;
        opacity: 0.7;
        filter: alpha(opacity=70);
        width: 58%;
        height: 100%;
        float: left;
    }
    .in-box-right {
        height: 100%;
        float: left;
        width: 42%;
        position: relative;
    }
    .ipt-cls-name {
        margin-top: 33px;
    }
    .ipt-cls-pwd {
        width: 100%;
    }
    .ipt-cls-login {
        width: 100%;
    }
    .form-div {
        width: 60%;
        height: 200px;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .el-form-item-style {
        width: 100%;
        display: inline-block;
    }
</style>
<template>
    <div class="bg-body">
        <div class="in-box">
            <div class="in-box-left"></div>
            <div class="in-box-right">
                <el-form :inline="true" :model="loginModel" ref="loginModel" :rules="loginRules" class="login-self-style">
                    <div class="form-div">
                        <el-form-item label="" prop="loginName" class="el-form-item-style">
                            <el-input v-model.trim = "loginModel.loginName" placeholder="登录名" class="ipt-cls-name"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="loginPwd" class="el-form-item-style">
                            <el-input v-model.trim = "loginModel.loginPwd" type="password" placeholder="密码" class="ipt-cls-pwd"></el-input>
                        </el-form-item>
                        <el-button type="primary" plain class="ipt-cls-login" @click="submitForm('loginModel')">登 录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import MyToken from 'src/utils/MyToken.js';
    import MyCookies from 'src/utils/MyCookies.js';
    export default {
        data() {
            let validateLoginName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入登录名'));
                } else {
                    callback();
                }
            };
            let validateLoginPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                secretToken: '',
                loginModel: {
                    loginName: '',
                    loginPwd: ''
                },
                loginRules: {
                    loginName: [
                        {required: true, validator: validateLoginName, trigger: 'blur'}
                    ],
                    loginPwd: [
                        {required: true, validator: validateLoginPwd, trigger: 'blur'}
                    ]
                }
            };
        },
        created() {
            this.getSecretToken();
        },
        computed: {
        },
        methods: {
            getSecretToken() {
                this.$http({
                    method: 'POST',
                    url: this.$api.getHomeProjectLink() + '/api/uac/auth/token/getSecretToken'
                }).then(res => {
                    this.secretToken = res.result;
                }).catch(error => {
                    console.log(error);
                });
            },
            submitForm(formName) {
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.doLogin();
                    } else {
                        return false;
                    }
                });
            },
            doLogin() {
                let _this = this;
                let loginName = _this.loginModel.loginName;
                let loginPwd = _this.loginModel.loginPwd;
                let loginParam = {};
                loginParam.secretToken = _this.secretToken;
                loginParam.loginName = this.$encrypto.aesEncrypt(loginName, _this.secretToken, _this.secretToken);
                loginParam.loginPwd = this.$encrypto.aesEncrypt(loginPwd, _this.secretToken, _this.secretToken);
                loginParam.systemId = 'ms';
                this.$http({
                    method: 'post',
                    url: this.$api.getHomeProjectLink() + '/api/uac/auth/login/login',
                    data: loginParam
                }).then(res => {
                    let getUserInfo = res.result;
                    let info = {
                        userId: getUserInfo.id,
                        userLoginName: getUserInfo.loginName,
                        userSerialNo: getUserInfo.serialNo,
                        userNickName: getUserInfo.nickName
                    };
                    MyToken.set(res.result.token);
                    MyCookies.set('info', info);
                    let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
                    _this.$router.push({ path: redirect });
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    };
</script>
