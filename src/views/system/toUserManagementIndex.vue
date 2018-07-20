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
                <el-breadcrumb-item :to="{ name: 'userManagementIndex' }">用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-addbtn-panel">
            <el-button type="primary" @click.native="addUser">添加用户</el-button>
        </div>
        <div class="page-header">
            <p>
                系统用户列表
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
                    label="登录名"
                    prop="loginName"
                    min-width="120"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="昵称"
                    prop="nickName"
                    min-width="120"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="用户状态"
                    prop="userStatus"
                    min-width="60">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.userStatus === '1'" type="success">正常状态</el-tag>
                        <el-tag v-else-if="scope.row.userStatus === '2'" type="danger">停用状态</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createdTime"
                    min-width="120"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="创建源"
                    prop="systemId"
                    min-width="60"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="发送邮箱"
                    prop="mail"
                    min-width="100"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="80">
                    <template slot-scope="scope">
                        <el-button class="xe-textBtn" type="text" size="small"
                                   v-if="scope.row.userStatus === '1'"
                                   @click="dropThis(scope.row)">停用
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
        filter: {
        },
        methods: {
            addUser() {
                this.$router.push({name: 'userManagementRegister'});
            },
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
                    pageSize: _this.pageSize,
                    param: postData
                };
                _this.$http({
                    method: 'POST',
                    data: data,
                    url: _this.$api.getHomeProjectLink() + '/api/gqz/system/user/queryUserList',
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
            },
            dropThis(row) {
                let _this = this;
                let data = {
                    id: row.id,
                    version: row.version
                };
                _this.$confirm('此操作将停用该账户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http({
                        method: 'POST',
                        url: _this.$api.getHomeProjectLink() + '/api/gqz/system/user/dropUserById',
                        data: data
                    }).then((res) => {
                        if (res.code === 200 && res.result) {
                            _this.$message({
                                type: 'success',
                                message: '停用成功'
                            });
                            _this.requestTableData(this.pageNum, this.filterModel);
                        } else {
                            _this.$alert(res.message, '错误', {
                                confirmButtonText: '确定',
                                type: 'error',
                            });
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消相关操作'
                    });
                });
            }
        }
    };
</script>
