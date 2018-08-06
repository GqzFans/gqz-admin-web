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
    .margin-top-10 {
        margin-top: 10px;
    }
    .input-col-500 {
        width: 500px !important;
    }
    .margin-top-10 .el-form-item label {
        margin-left: -20px !important;
    }
</style>
<template>
    <div class="page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>数据分析</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'wsData' }">微视数据分析</el-breadcrumb-item>
                <el-breadcrumb-item>添加微视数据分析</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :inline="true" :model="addModel" ref="addModel" :rules="videoRules" label-width="100px">
            <el-alert
                style="margin-top: 10px; display: inline-block;"
                title="请填写微视参考标题，例如：高秋梓20180101期"
                type="info"
                :closable="false">
            </el-alert>
            <div class="margin-top-10">
                <el-form-item label="参考标题" prop="wsVideoTitle" style="margin-left: -20px;" required>
                    <el-input v-model.trim="addModel.wsVideoTitle" class="input-col-500"></el-input>
                </el-form-item>
            </div>
            <el-alert
                style="margin-top: 10px; display: inline-block;"
                title="请粘贴腾讯视频源地址，例如：https://h5.qzone.qq.com/weishi/feed/BpuwoKHetuulQmeYpKQ0RI 链接后面内容请删除"
                type="info"
                :closable="false">
            </el-alert>
            <div class="margin-top-10">
                <el-form-item label="视频地址" prop="wsVideoUrl" style="margin-left: -20px;" required>
                    <el-input v-model.trim="addModel.wsVideoUrl" class="input-col-500"></el-input>
                </el-form-item>
            </div>
            <el-alert
                style="margin-top: 10px; display: inline-block;"
                title="微视短视频VID自动生成，管理人员可自行确认VID是否正确"
                type="info"
                :closable="false">
            </el-alert>
            <div class="margin-top-10">
                <el-form-item label="视频-VID" prop="wsVideoId" style="margin-left: -20px;">
                    <el-input v-model.trim="addModel.wsVideoId" class="input-col-500" disabled></el-input>
                </el-form-item>
            </div>
            <div class="page-header"></div>
            <div class="margin-top-10">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addModel')">保存</el-button>
                    <el-button @click="backBtnClick()" style="margin-left: 2px;">返回</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            let validateTitle = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入参考标题'));
                } else {
                    callback();
                }
            };
            let validateUrl = (rule, value, callback) => {
                if (value !== '' && value !== null) {
                    var reg = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请正确粘贴微视短视频地址'));
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('请输入视频地址'));
                }
            };
            let validateVid = (rule, value, callback) => {
                console.log('value = ', value);
                if (value === '' || value === null || value === undefined) {
                    callback(new Error('请检查视频地址是否正确'));
                } else {
                    callback();
                }
            };
            return {
                addModel: {
                    wsVideoTitle: '',
                    wsVideoUrl: '',
                    wsVideoId: ''
                },
                videoRules: {
                    wsVideoTitle: [
                        {required: true, validator: validateTitle, trigger: 'blur'},
                        {max: 20, message: '长度在20个字符以内', trigger: 'blur'}
                    ],
                    wsVideoUrl: [
                        {required: true, validator: validateUrl, trigger: 'blur'}
                    ],
                    wsVideoId: [
                        {required: true, validator: validateVid, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                let _this = this;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.addWs();
                    } else {
                        return false;
                    }
                });
            },
            addWs() {
                let _this = this;
                _this.$http({
                    method: 'post',
                    url: _this.$api.getHomeProjectLink() + '/api/gqz/data/ws/addGqzWsData',
                    data: _this.addModel
                }).then(res => {
                    if (res.code === 200 && res.result) {
                        _this.$message({
                            type: 'success',
                            message: '添加微视数据分析成功'
                        });
                        _this.$router.push({ name: 'wsData' });
                    } else {
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error',
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            backBtnClick() {
                this.$router.go(-1);
            }
        },
        watch: {
            'addModel.wsVideoUrl': function (val, oldVal) {
                let _this = this;
                if (val !== '' && val !== null) {
                    var reg = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                    var res = reg.test(val);
                    if (res) {
                        var startIndex = val.lastIndexOf('/weishi/feed/');
                        var endIndex = val.length;
                        _this.addModel.wsVideoId = val.substring(startIndex + 13, endIndex).split('.')[0];
                    } else {
                        _this.addModel.wsVideoId = '';
                    }
                } else {
                    _this.addModel.videoVid = '';
                }
            }
        }
    };
</script>
