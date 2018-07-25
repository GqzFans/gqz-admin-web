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
    .page-addbtn-panel {
        margin-top: 15px !important;
        padding-bottom: 8px;
    }
    .page-header {
        margin-top: -10px;
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
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>意见反馈</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-header">
            <p>
                小程序用户意见反馈列表
            </p>
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
                    label="小程序用户昵称"
                    prop="nickName"
                    min-width="80"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="反馈时间"
                    prop="createTime"
                    min-width="100"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="反馈内容"
                    prop="feedbackContent"
                    min-width="300"
                    show-overflow-tooltip>
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
                filterModel: {
                },
                tableData: [],
                currPage: 1,
                pageNum: 1,
                pageSize: 10,
                total: 0
            };
        },
        created() {
            this.requestTableData(this.pageNum, this.filterModel);
        },
        methods: {
            handleSizeChange(page) {
                if (page !== 0) {
                    this.pageSize = page;
                    this.requestTableData(this.currPage, this.filterModel);
                }
            },
            handleCurrentChange(page) {
                this.currPage = page;
                this.requestTableData(this.currPage, this.filterModel);
            },
            requestTableData(postNum, postData) {
                let _this = this;
                let data = {
                    pageNum: postNum,
                    pageSize: _this.pageSize
                };
                _this.$http({
                    method: 'POST',
                    data: data,
                    url: _this.$api.getHomeProjectLink() + '/api/gqz/system/feedback/queryFeedback',
                }).then((res) => {
                    if (res.code === 200) {
                        _this.tableData = res.result.list;
                        _this.total = res.result.total;
                    } else {
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error',
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    };
</script>
