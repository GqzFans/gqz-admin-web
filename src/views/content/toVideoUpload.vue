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
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'contentVideo' }">视频管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加视频</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :inline="true" :model="addModel" ref="addModel" :rules="videoRules" label-width="100px">
            <el-alert
                style="margin-top: 10px; display: inline-block;"
                title="请填写视频标题，建议输入20个字符以内"
                type="info"
                :closable="false">
            </el-alert>
            <div class="margin-top-10">
                <el-form-item label="视频标题" prop="videoTitle" style="margin-left: -20px;" required>
                    <el-input v-model.trim="addModel.videoTitle" class="input-col-500"></el-input>
                </el-form-item>
            </div>
            <el-alert
                style="margin-top: 10px; display: inline-block;"
                title="请粘贴腾讯视频源地址，例如：https://v.qq.com/???/???/u0703hoawgv.html"
                type="info"
                :closable="false">
            </el-alert>
            <div class="margin-top-10">
                <el-form-item label="视频地址" prop="videoUrl" style="margin-left: -20px;" required>
                    <el-input v-model.trim="addModel.videoUrl" class="input-col-500"></el-input>
                </el-form-item>
            </div>
            <el-alert
                style="margin-top: 10px; display: inline-block;"
                title="腾讯视频VID自动生成，管理人员可自行确认VID是否正确"
                type="info"
                :closable="false">
            </el-alert>
            <div class="margin-top-10">
                <el-form-item label="视频-VID" prop="videoVid" style="margin-left: -20px;">
                    <el-input v-model.trim="addModel.videoVid" class="input-col-500" disabled></el-input>
                </el-form-item>
            </div>
            <el-alert
                style="margin-top: 10px; display: inline-block;"
                title="请选择视频类型"
                type="info"
                :closable="false">
            </el-alert>
            <div class="margin-top-10">
                <el-form-item label="视频类型" prop="videoType" style="margin-left: -20px;" required>
                    <el-radio-group v-model="addModel.videoType" style="margin-left: 20px;">
                        <el-radio :label="0" style="padding-right: 40px;">饭制</el-radio>
                        <el-radio :label="1" style="padding-right: 40px;">娱乐</el-radio>
                        <el-radio :label="2" style="padding-right: 40px;">综艺</el-radio>
                        <el-radio :label="3" style="padding-right: 40px;">搞笑</el-radio>
                        <el-radio :label="4" style="padding-right: 40px;">音乐</el-radio>
                        <el-radio :label="5" style="padding-right: 40px;">舞蹈</el-radio>
                    </el-radio-group>
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
                    callback(new Error('请输入视频标题'));
                } else {
                    callback();
                }
            };
            let validateUrl = (rule, value, callback) => {
                if (value !== '' && value !== null) {
                    var reg = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请正确粘贴腾讯视频地址'));
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
                    videoTitle: '',
                    videoUrl: '',
                    videoVid: '',
                    videoType: 0
                },
                videoRules: {
                    videoTitle: [
                        {required: true, validator: validateTitle, trigger: 'blur'},
                        {max: 20, message: '长度在20个字符以内', trigger: 'blur'}
                    ],
                    videoUrl: [
                        {required: true, validator: validateUrl, trigger: 'blur'}
                    ],
                    videoVid: [
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
                        _this.addVideo();
                    } else {
                        return false;
                    }
                });
            },
            addVideo() {
                let _this = this;
                let data = _this.addModel;
                if (data.videoType === 0) {
                    data.videoType = '饭制';
                } else if (data.videoType === 1) {
                    data.videoType = '娱乐';
                } else if (data.videoType === 2) {
                    data.videoType = '综艺';
                } else if (data.videoType === 3) {
                    data.videoType = '搞笑';
                } else if (data.videoType === 4) {
                    data.videoType = '音乐';
                } else if (data.videoType === 5) {
                    data.videoType = '舞蹈';
                }
                _this.$http({
                    method: 'post',
                    url: _this.$api.getHomeProjectLink() + '/api/gqz/content/video/addGqzVideo',
                    data: data
                }).then(res => {
                    if (res.code === 200 && res.result) {
                        _this.$message({
                            type: 'success',
                            message: '添加视频成功'
                        });
                        _this.$router.push({ name: 'contentVideo' });
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
            'addModel.videoUrl': function (val, oldVal) {
                let _this = this;
                if (val !== '' && val !== null) {
                    var reg = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                    var res = reg.test(val);
                    if (res) {
                        var startIndex = val.lastIndexOf('/');
                        var endIndex = val.length;
                        _this.addModel.videoVid = val.substring(startIndex + 1, endIndex).split('.')[0];
                    } else {
                        _this.addModel.videoVid = '';
                    }
                } else {
                    _this.addModel.videoVid = '';
                }
            }
        }
    };
</script>
