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
    #main {
        margin-top: 20px;
        width: 100%;
        height: 580px;
    }
</style>
<template>
    <div class="page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>数据分析</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'wsData' }">微视数据分析</el-breadcrumb-item>
                <el-breadcrumb-item>数据分析详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="main"></div>
        <div class="margin-top-10">
            <el-button @click="backBtnClick()" style="margin-left: 2px;">返回</el-button>
        </div>
    </div>
</template>
<script>
    var echarts = require('echarts/lib/echarts');
    // 引入组件
    require('echarts/lib/chart/line');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        data() {
            return {
                feedId: '',
                dateResult: [],
                playNumResult: []
            };
        },
        created() {
            this.feedId = this.$route.query.feedId;
        },
        mounted() {
            this.requestTableData();
        },
        methods: {
            requestTableData() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: _this.$api.getHomeProjectLink() + '/api/gqz/data/ws/getWsDataLogByWsId/' + _this.feedId
                }).then((res) => {
                    if (res.code === 200) {
                        _this.dateResult = res.result.date;
                        _this.playNumResult = res.result.playNum;
                        _this.drawLine();
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
            drawLine() {
                let myChart = echarts.init(document.getElementById('main'));
                myChart.setOption({
                    title: {
                        text: '腾讯微视播放量：短视频VID：' + this.feedId
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: this.dateResult
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.playNumResult,
                        type: 'line'
                    }]
                });
            },
            backBtnClick() {
                this.$router.go(-1);
            }
        }
    };
</script>
