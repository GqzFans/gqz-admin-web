<style>
    /*面包屑导航样式*/
    .breadcrumb-con {
        margin-top:0;
        padding-bottom:15px;
        border-bottom:1px solid #e8e8e8;
    }
    .page-content {
        min-height: 100%;
        padding: 8px 16px 24px;
    }
    .page-header {
        margin: 10px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #c2c2c2;
    }
    .margin-top-20 {
        margin-top: 20px;
    }
    .input-col-600 {
        width: 600px !important;
    }
    .margin-top-20 .el-form-item label {
        margin-left: -10px;
    }
    .el-form-item__label {
        width: 150px !important;
    }
    .el-form-item__error {
        margin: 0;
    }
</style>
<template>
    <div class="page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'userManagementIndex' }">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>注册用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :inline="true" :model="addModel" ref="addModel" :rules="registerRules" label-width="100px">
            <div class="margin-top-20">
                <div>
                    <el-form-item label="登录名" prop="loginName" required>
                        <el-input v-model="addModel.loginName" class="input-col-600"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="昵称" prop="nickName" required>
                        <el-input v-model="addModel.nickName" class="input-col-600"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="系统生成密码" prop="loginPwd" required>
                        <el-input v-model="addModel.loginPwd" class="input-col-600" disabled></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="用户信息发送邮箱" prop="mail" required>
                        <el-input v-model="addModel.mail" class="input-col-600"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="注册系统来源" prop="systemId" required>
                        <el-radio-group v-model="addModel.systemId" style="margin-left: 10px;">
                            <el-radio :label="0">资源站</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
            </div>
            <div style="margin-left: 140px;">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addModel')">保存</el-button>
                    <el-button @click="backBtnClick()" style="margin-left: 10px;">返回</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            let validateLoginName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入登录名'));
                } else if (value.length < 3) {

                } else {
                    callback();
                }
            };
            let validateNickName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入昵称'));
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
            let validateMail = (rule, value, callback) => {
                if (value !== '' && value !== null) {
                    var reg = /^[^.@]+@[^.@]+.[a-z]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请正确填写邮箱地址'));
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('请输入邮箱地址'));
                }
            };
            return {
                addModel: {
                    loginName: '',
                    nickName: '',
                    loginPwd: '',
                    confirmPwd: '',
                    mail: '',
                    systemId: 0
                },
                registerRules: {
                    loginName: [
                        {required: true, validator: validateLoginName, trigger: 'blur'},
                        {max: 20, message: '长度在20个字符以内', trigger: 'blur'}
                    ],
                    nickName: [
                        {required: true, validator: validateNickName, trigger: 'blur'},
                        {max: 20, message: '长度在20个字符以内', trigger: 'blur'}
                    ],
                    loginPwd: [
                        {required: true, validator: validateLoginPwd, trigger: 'blur'}
                    ],
                    mail: [
                        {required: true, validator: validateMail, trigger: 'blur'}
                    ]
                }
            };
        },
        created() {
            this.getRandomStr(16);
        },
        filter: {
        },
        methods: {
            submitForm(formName) {
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.doRegister();
                    } else {
                        return false;
                    }
                });
            },
            backBtnClick() {
                this.$router.go(-1);
            },
            getRandomStr(len) {
                let _this = this;
                var text = "";
                var possible = '0123456789abcdefghjkmnopqrstuvwxyABCDEFGHJKMNOPQRSTUVWXY';
                for (var i = 0; i < len; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                _this.addModel.loginPwd = text;
            },
            doRegister() {
                let _this = this;
                let registerParam = {};
                registerParam = _this.addModel;
                registerParam.confirmPwd = registerParam.loginPwd;
                if (registerParam.systemId === 0) {
                    registerParam.systemId = 'gqz-zyz';
                }
                console.log('registerParam = ', registerParam);
                this.$http({
                    method: 'post',
                    url: '/api/uac/auth/register/register',
                    data: registerParam
                }).then(res => {
                    if (res.code === 200) {
                        _this.$message({
                            type: 'success',
                            message: '注册成功'
                        });
                        _this.$router.push({ name: 'userManagementIndex' });
                    } else {
                        // 重置表单
                        _this.addModel.systemId = 0;
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error',
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    };
</script>
