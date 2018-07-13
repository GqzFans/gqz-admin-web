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
        margin-left: -70px;
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
                <el-form-item label="图片文案" prop="contentInfo">
                    <el-input v-model="addModel.contentInfo" class="input-col-500"></el-input>
                </el-form-item>
                <el-alert
                    style="margin-bottom: 10px; display: inline-block;"
                    title="上传图片：建议以图片分组类型上传，相同文案图片可同时批量上传。"
                    type="info"
                    :closable="false">
                </el-alert>
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
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
                    contentInfo: '高秋梓资源站'
                }
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
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            submitForm(formName) {
            },
            backBtnClick() {
                this.$router.go(-1);
            }
        }

    };
</script>
