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
                <el-breadcrumb-item :to="{ name: 'contentImage' }">图片管理</el-breadcrumb-item>
                <el-breadcrumb-item>图片上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-alert
            style="margin-top: 10px; display: inline-block;"
            title="可自行更改图片文案，默认文案为：高秋梓资源站"
            type="info"
            :closable="false">
        </el-alert>
        <el-form :inline="true" :model="addModel" ref="addModel" label-width="100px">
            <div class="margin-top-10">
                <el-form-item label="图片文案" prop="imageDescription">
                    <el-input v-model.trim="addModel.imageDescription" class="input-col-500"></el-input>
                </el-form-item>
                <el-alert
                    style="margin-bottom: 10px; display: inline-block;"
                    title="上传图片：建议以图片分组类型上传，相同文案图片可同时批量上传。"
                    type="info"
                    :closable="false">
                </el-alert>
                <el-upload :headers="token" name="image"
                    :action="actionUrl"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-error="checkError"
                    :on-success="checkSuccess"
                    :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <div class="page-header"></div>
            <div class="margin-top-10">
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">保存</el-button>
                    <el-button @click="backBtnClick()" style="margin-left: 2px;">返回</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
    import MyCookies from '../../utils/MyCookies';
    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                addModel: {
                    imageDescription: '高秋梓资源站',
                    imageList: []
                },
                token: {Authorization: 'Bearer ' + MyCookies.getNowCookie().token},
                actionUrl: '/api/gqz/common/file/uploadImage'
            };
        },
        methods: {
            handleRemove(file, fileList) {
                let _this = this;
                let tempItem = '';
                _this.addModel.imageList = [];
                fileList.forEach((item) => {
                    tempItem = item.response.result[0];
                    _this.addModel.imageList.push(tempItem);
                });
                console.log('handleRemove imageList = ', _this.addModel.imageList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            checkError (err, file, fileList) { // 图片上传-出错
                console.log(err, file, fileList);
            },
            checkSuccess (response, file, fileList) { // 图片上传-成功
                let _this = this;
                let tempItem = '';
                _this.addModel.imageList = [];
                fileList.forEach((item) => {
                    if (item.response !== null && item.response !== '' && item.response !== undefined) {
                        tempItem = item.response.result[0];
                        _this.addModel.imageList.push(tempItem);
                    }
                });
                console.log('success imageList = ', _this.addModel.imageList);
            },
            beforeAvatarUpload(file) { // 图片上传-校验
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isJPG) {
                    this.$alert('上传图片只能是 JPG、png、GIF 格式!', '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    });
                }
                if (!isLt10M) {
                    this.$alert('上传图片大小不能超过 10MB!', '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    });
                }
                return isJPG && isLt10M;
            },
            submitForm() {
                let _this = this;
                if (_this.addModel.imageDescription === undefined || _this.addModel.imageDescription === '') {
                    _this.$message.error('请完善图片文案');
                    return;
                }
                let data = _this.addModel;
                // console.log('submitForm -> ', data);
                _this.$http({
                    method: 'post',
                    url: '/api/gqz/content/image/addGqzImage',
                    data: data
                }).then(res => {
                    if (res.code === 200 && res.result) {
                        _this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                        _this.$router.push({ name: 'contentImage' });
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
        }

    };
</script>
