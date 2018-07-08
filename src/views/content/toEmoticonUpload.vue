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
        margin-left: -15px;
    }
</style>
<template>
    <div class="page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'contentEmoticon' }">表情包管理</el-breadcrumb-item>
                <el-breadcrumb-item>表情包上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-alert
            style="margin-top: 10px; display: inline-block;"
            title="请为此表情包填写一句说明文案"
            type="info"
            :closable="false">
        </el-alert>
        <el-form :inline="true" :model="addModel" ref="addModel" label-width="100px">
            <div class="margin-top-10">
                <el-form-item label="表情包说明" prop="contentInfo">
                    <el-input v-model="addModel.contentInfo" class="input-col-500"></el-input>
                </el-form-item>
                <el-alert
                    style="margin-bottom: 10px; display: inline-block;"
                    title="上传表情包：请单张上传。"
                    type="info"
                    :closable="false">
                </el-alert>
                <el-upload name="img_1" id="img_1" class="img_1"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="checkSuccess"
                    :on-error="checkError"
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
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                addModel: {
                    contentInfo: '',
                    imgSerialNo: '',
                    img: '',
                    imgName: ''
                },
                checkUpload: 0,
                checkDisabled: false,
                picerr: false
            };
        },
        created() {
        },
        activated() {
        },
        filter: {
        },
        methods: {
            handleRemove(file, fileList) {
                console.log('remove file = ', file);
                console.log('fileList = ', fileList);
                if (!this.picerr) {
                    let _this = this;
                    _this.addModel.imgSerialNo = '';
                    _this.addModel.img = '';
                    _this.addModel.imgName = '';
                    // 重新计数
                    _this.checkUpload--;
                    _this.checkDisabled = false;
                    document.querySelector('.img_1 .el-upload').style.display = 'inline-block';
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            submitForm(formName) {
            },
            backBtnClick() {
                this.$router.go(-1);
            },
            checkSuccess (response, file, fileList) { // 图片上传-成功
                let _this = this;
                _this.vouchers = [];
                fileList.forEach((item) => {
                    _this.addModel.imgSerialNo = item.response.result;
                });
            },
            checkError (err, file, fileList) { // 图片上传-出错
                console.log(err, file, fileList);
                if (this.checkUpload > 0 && this.checkUpload < 1) {
                    this.checkUpload--;
                    this.checkDisabled = false;
                    document.querySelector('.img_1 .el-upload').style.display = 'inline-block';
                }
            },
            beforeAvatarUpload(file) { // 左面图片上传-校验
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 5;
                if (!isJPG) {
                    this.$alert('上传图片只能是 JPG、png、GIF 格式!', '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    });
                    this.picerr = true;
                }
                if (!isLt2M) {
                    this.$alert('上传图片大小不能超过 5MB!', '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    });
                    this.picerr = true;
                }
                if (isJPG && isLt2M) {
                    if (this.checkUpload >= 1) {
                        this.$message.error('最多上传一张图片');
                        return false;
                    } else {
                        this.checkUpload++;
                        if (this.checkUpload === 1) {
                            this.checkDisabled = true;
                            document.querySelector('.img_1 .el-upload').style.display = 'none';
                        }
                    }
                }
                return isJPG && isLt2M;
            }
        }

    };
</script>
