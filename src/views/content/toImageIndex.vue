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
    .page-addbtn-panel {
        margin-top: -3px;
        padding-bottom: 8px;
    }
    .form-cls {
        margin: 20px 0 0 -90px !important;
    }
    .page-header {
        margin: 10px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #c2c2c2;
    }
    /*分页*/
    .page-pagination-panel {
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: right;
    }
</style>
<template>
    <div class="page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'contentImage' }">图片管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :inline="true" :model="filterModel" ref="filterModel" label-width="100px" class="form-cls">
            <div>
                <el-form-item label="创建人" prop="createUserName">
                    <el-input class="input-104" v-model="filterModel.createUserName" placeholder="创建人名称"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                    <el-date-picker
                        v-model="filterModel.createTime"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="" class="xe-btn-group">
                    <el-button type="primary" @click="filterForm('filterModel')">筛选</el-button>
                    <el-button @click="resetForm('filterModel')">重置</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="page-header">
            <p>
                资源站图片列表
            </p>
        </div>
        <div class="page-addbtn-panel">
            <el-button type="primary" @click.native="addContent">添加图片资源</el-button>
        </div>
        <div>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    label="序号"
                    type="index"
                    fixed='left'
                    width="55">
                </el-table-column>
                <el-table-column
                    label="图片回源地址"
                    prop="imageUrl"
                    min-width="200"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="图片描述文案"
                    prop="imageUrl"
                    min-width="120"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="创建人"
                    prop="createUserName"
                    min-width="60"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createTime"
                    min-width="120"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="120">
                    <template slot-scope="scope">
                        <el-button class="xe-textBtn" type="text" size="small" @click="dropThis(scope.row)">
                            下架
                        </el-button>
                        <el-button class="red" type="text" size="small" @click="deleteThis(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-pagination-panel">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                filterModel: {
                    createTime: '',
                    createUserName: ''
                },
                tableData: [],
                currPage: 1,
                pageSize: 10,
                total: 0
            };
        },
        created() {
        },
        activated() {
        },
        filter: {
        },
        methods: {
            addContent() {
                this.$router.push({name: 'contentImageUpload'});
            },
            handleSizeChange(page) {
                if (page !== 0) {
                    this.pageSize = page;
                    this.requestTableData(this.currPage, this.filterModel);
                }
            },
            handleCurrentChange(page) {
                console.log(page, 'page');
                this.currPage = page;
                this.requestTableData(this.currPage, this.filterModel);
            },
            filterForm(formName) {
                this.requestTableData(this.currPage, this.filterModel);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.requestTableData(this.currPage, this.filterModel);
            },
            requestTableData(postNum, postData) {
            },
            dropThis(row) {
            },
            deleteThis(row) {
            }
        }

    };
</script>
