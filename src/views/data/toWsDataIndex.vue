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
        margin-top: 8px;
        padding-bottom: 10px;
    }
    .form-cls {
        margin: 15px 0 0 -40px;
    }
    .page-header {
        margin-top: -10px;
        border-bottom: 1px solid #c2c2c2;
    }
    /*分页*/
    .page-pagination-panel {
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: right;
    }
    a:link, a:visited {
        text-decoration: none;
    }
    .el-form-box {
        min-width: 1150px;
    }
</style>
<template>
    <div class="page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>数据分析</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'wsData' }">微视数据分析</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-header">
            <p>
                数据站-腾讯微视数据分析
            </p>
        </div>
        <div class="page-addbtn-panel">
            <el-button type="primary" @click.native="addWs">添加微视数据分析</el-button>
            <el-button type="primary" @click.native="flushData" style="margin-left: 5px;">刷新</el-button>
            <el-checkbox v-model="secondFlush" @change="flushStatus()" style="float: right;margin-top: 7px;">30s自动刷新</el-checkbox>
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
                    width="50">
                </el-table-column>
                <el-table-column
                    label="微视短视频参考标题"
                    prop="wsVideoTitle"
                    min-width="60"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="微视短视频源地址"
                    prop="wsVideoUrl"
                    min-width="170"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a :href="scope.row.wsVideoUrl" target="_blank">{{scope.row.wsVideoUrl}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    label="微视短视频VID"
                    prop="wsVideoId"
                    min-width="80"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="当前最新播放量（次数）"
                    prop="playNum"
                    min-width="75"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="color: red; font-weight: bold;">{{scope.row.playNum}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="创建人"
                    prop="createUserName"
                    min-width="40"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createTime"
                    min-width="70"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="200">
                    <template slot-scope="scope">
                        <el-button style="color: #409EFF;" type="text" size="small" @click="showDetail(scope.row)">
                            查看数据
                        </el-button>
                        <el-button v-if="scope.row.workerListenerStatus === 1" style="color: #E6A23C;" type="text" size="small" @click="dropThis(scope.row)">
                            关闭数据统计
                        </el-button>
                        <el-button v-if="scope.row.workerListenerStatus === 2" style="color: #67C23A;" type="text" size="small" @click="upThis(scope.row)">
                            开启数据统计
                        </el-button>
                        <el-button style="color: red;" type="text" size="small" @click="deleteThis(scope.row)">
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
                secondFlush: false,
                timer: null,
                dateRange: [],
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
        activated() {
        },
        filter: {
        },
        methods: {
            flushStatus() {
                let _this = this;
                if (_this.secondFlush) {
                    _this.setIntervalFn();
                } else {
                    clearInterval(this.timer);
                }
            },
            setIntervalFn() {
                let _this = this;
                _this.timer = setInterval(function () {
                    _this.flushData();
                }, 1000 * 30);
            },
            addWs() {
                this.$router.push({name: 'dataWsAdd'});
            },
            flushData() {
                this.requestTableData(this.pageNum, this.filterModel);
            },
            showDetail(row) {
                this.$router.push({name: 'dataWsCharts', query: {feedId: row.wsVideoId}});
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
            filterForm(formName) {
                this.requestTableData(this.currPage, this.filterModel);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dateRange = [];
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
                    url: _this.$api.getHomeProjectLink() + '/api/gqz/data/ws/queryWsDataList',
                    data: data
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
                    version: row.version,
                    model: 'drop'
                };
                _this.$confirm('此操作将关闭数据统计, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http({
                        method: 'POST',
                        url: _this.$api.getHomeProjectLink() + '/api/gqz/data/ws/operateWsDataWorkerListenerById',
                        data: data
                    }).then((res) => {
                        if (res.code === 200 && res.result) {
                            _this.$message({
                                type: 'success',
                                message: '操作成功'
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
            },
            upThis(row) {
                let _this = this;
                let data = {
                    id: row.id,
                    version: row.version,
                    model: 'up'
                };
                _this.$confirm('确认开启数据统计?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http({
                        method: 'POST',
                        url: _this.$api.getHomeProjectLink() + '/api/gqz/data/ws/operateWsDataWorkerListenerById',
                        data: data
                    }).then((res) => {
                        if (res.code === 200 && res.result) {
                            _this.$message({
                                type: 'success',
                                message: '操作成功'
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
            },
            deleteThis(row) {
                let _this = this;
                let data = {
                    id: row.id,
                    version: row.version
                };
                _this.$confirm('此操作将删除数据分析, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http({
                        method: 'POST',
                        url: _this.$api.getHomeProjectLink() + '/api/gqz/data/ws/deleteWsDataById',
                        data: data
                    }).then((res) => {
                        if (res.code === 200 && res.result) {
                            _this.$message({
                                type: 'success',
                                message: '操作成功'
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
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    };
</script>
