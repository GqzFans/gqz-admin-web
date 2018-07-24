<style rel="stylesheet/scss" lang="scss" scoped>
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
        width: 250px !important;
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
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :inline="true" :model="addModel" ref="addModel" :rules="myRules" label-width="140px">
            <div class="margin-top-20">
                <div>
                    <el-form-item label="原始密码" prop="loginPwd" required>
                        <el-input v-model.trim="addModel.loginPwd" class="input-col-600" type="password"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="新密码" prop="newLoginPwd" required>
                        <el-input v-model.trim="addModel.newLoginPwd" class="input-col-600" type="password"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div style="margin-left: 140px;">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addModel')">修改</el-button>
                    <el-button @click="backBtnClick()" style="margin-left: 10px;">返回</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
    import LogOut from "../../utils/LogOut";

    export default {
        data() {
            let validateLoginPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原始密码'));
                } else {
                    callback();
                }
            };
            let validateNewLoginPwd = (rule, value, callback) => {
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
                var val = reg.test(value);
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if (value.length < 8) {
                    callback(new Error('新密码长度不得小于8位字符'));
                } else if (value.length > 16) {
                    callback(new Error('新密码长度不得大于16位字符'));
                } else if (val !== true) {
                    callback(new Error('新密码必须包含字母和数字两种类型'));
                } else {
                    callback();
                }
            };
            return {
                addModel: {
                    loginPwd: '',
                    newLoginPwd: ''
                },
                myRules: {
                    loginPwd: [
                        {required: true, validator: validateLoginPwd, trigger: 'blur'}
                    ],
                    newLoginPwd: [
                        {required: true, validator: validateNewLoginPwd, trigger: 'blur'}
                    ]
                }
            };
        },
        created() {
        },
        filter: {
        },
        methods: {
            submitForm(formName) {
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.doChangePwd();
                    } else {
                        return false;
                    }
                });
            },
            backBtnClick() {
                this.$router.go(-1);
            },
            doChangePwd() {
                let _this = this;
                _this.$http({
                    method: 'post',
                    url: _this.$api.getHomeProjectLink() + '/api/uac/auth/register/changePassword',
                    data: _this.addModel
                }).then(res => {
                    if (res.code === 200 && res.result) {
                        _this.$message({
                            type: 'success',
                            message: '修改密码成功'
                        });
                        setTimeout(() => {
                            LogOut();
                        }, 1500);
                    } else {
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
