<style rel="stylesheet/scss" lang="scss" scoped>
    .clearFix:before, .clearFix:after {
        display: table;
        content: "";
    }
    .clearFix:after {
        clear: both
    }
    .box-card-left {
        width: 460px;
        margin: 20px 0 0 30px;
    }
    .box-card-right {
        width: 600px;
    }
    .left-data-div {
        margin: -3px 0 5px 0;
    }
    .count {
        color: #F56C6C;
    }
    .stroke-style {
        margin-top: 5px;
    }
    /**
     * 走马灯
     */
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }
    .banner-img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        margin: auto;
        z-index: -1;
        *zoom: 1;
    }
    .dashboard-box {
        min-width: 1150px;
    }
    .dashboard-left {
        max-width: 510px;
        float: left;
    }
    .dashboard-right {
        float: left;
        margin: 20px 0 0 40px;
    }
</style>
<template>
  <div class="dashboard-box">
      <div class="dashboard-left">
          <el-card class="box-card-left">
              <div class="block">
                  <el-carousel height="150px">
                      <el-carousel-item v-for="item in bannerList" :key="item.title">
                          <img :src="item.imgUrl" :alt="item.title" class="banner-img"/>
                      </el-carousel-item>
                  </el-carousel>
              </div>
          </el-card>
          <el-card class="box-card-left">
              <div slot="header" class="clearFix">
                  <span>资源站 - 资源数据统计</span>
              </div>
              <div class="left-data-div">
                  <span>图片数量：</span>
                  <i class="count">{{dataStatistics.gqzImageCount}}</i>
              </div>
              <div class="left-data-div">
                  <span>表情包数量：</span>
                  <i class="count">{{dataStatistics.gqzEmoticonCount}}</i>
              </div>
              <div class="left-data-div">
                  <span>视频数量：</span>
                  <i class="count">{{dataStatistics.gqzVideoCount}}</i>
              </div>
          </el-card>
          <el-card class="box-card-left">
              <div slot="header" class="clearFix">
                  <span>资源站 - 新增资源数据统计（月统计）</span>
              </div>
              <div style="margin-top: -9px;">
                  <span>图片上传占比：</span>
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="dataStatistics.uploadImageMonthPercentage * 100" color="#67C23A" class="stroke-style"></el-progress>
              </div>
              <div style="margin-top: 10px;">
                  <span>表情包上传占比：</span>
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="dataStatistics.uploadEmoticonMonthPercentage * 100" color="rgb(32, 160, 255)" class="stroke-style"></el-progress>
              </div>
              <div style="margin-top: 10px;">
                  <span>视频上传占比：</span>
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="dataStatistics.uploadVideoMonthPercentage * 100" color="rgba(142, 113, 199, 0.7)" class="stroke-style"></el-progress>
              </div>
          </el-card>
      </div>
      <div class="dashboard-right">
          <el-card class="box-card-right">
              <div slot="header" class="clearFix">
                  <span>最近登录的用户</span>
              </div>
              <div style="margin-top: -15px;">
                  <el-table
                      :data="userTableData"
                      style="width: 100%">
                      <el-table-column
                          prop="loginTime"
                          min-width="110"
                          label="日期">
                          <template slot-scope="scope">
                              {{scope.row.loginTime | timeFormat}}
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="loginName"
                          min-width="160"
                          label="用户ID">
                      </el-table-column>
                      <el-table-column
                          prop="loginIp"
                          min-width="100"
                          label="登录IP">
                      </el-table-column>
                  </el-table>
              </div>
          </el-card>
          <el-card class="box-card-right" style="margin-top: 15px;">
              <span style="margin-bottom: 10px; display: inline-block;">近期上线功能</span>
              <el-collapse v-model="activeNames">
                  <el-collapse-item :title="versionInfo_0.versionName" name="1">
                      <div>{{versionInfo_0.versionTime}}</div>
                      <div>{{versionInfo_0.versionDescription}}</div>
                  </el-collapse-item>
                  <el-collapse-item :title="versionInfo_1.versionName" name="2">
                      <div>{{versionInfo_1.versionTime}}</div>
                      <div>{{versionInfo_1.versionDescription}}</div>
                  </el-collapse-item>
              </el-collapse>
          </el-card>
      </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            bannerList: [
                { imgUrl: 'https://gaoqiuzi-files.oss-cn-beijing.aliyuncs.com/admin-web-assets/banner-2.jpg?x-oss-process=style/gzip', title: 'banner_2' },
                { imgUrl: 'https://gaoqiuzi-files.oss-cn-beijing.aliyuncs.com/admin-web-assets/banner-3.jpg?x-oss-process=style/gzip', title: 'banner_3' }
            ],
            activeNames: ['1', '2'],
            userTableData: [],
            dataStatistics: {
                gqzImageCount: '',
                gqzEmoticonCount: '',
                gqzVideoCount: '',
                uploadImageMonthPercentage: '',
                uploadEmoticonMonthPercentage: '',
                uploadVideoMonthPercentage: ''
            },
            versionInfo_0: {
                versionName: '',
                versionTime: '',
                versionDescription: ''
            },
            versionInfo_1: {
                versionName: '',
                versionTime: '',
                versionDescription: ''
            }
        };
    },
    created() {
        this.getRecentUserLog();
        this.getDataStatistics();
        this.getVersionInfo();
    },
    filters: {
        timeFormat(val) {
            return val.substring(0, 19);
        }
    },
    methods: {
        getRecentUserLog() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: _this.$api.getHomeProjectLink() + '/api/gqz/dashboard/getRecentUserLog'
            }).then((res) => {
                if (res.code === 200) {
                    _this.userTableData = res.result;
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
        getDataStatistics() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: _this.$api.getHomeProjectLink() + '/api/gqz/dashboard/getDataStatistics'
            }).then((res) => {
                if (res.code === 200) {
                    _this.dataStatistics = res.result;
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
        getVersionInfo() {
            let _this = this;
            _this.$http({
                method: 'GET',
                url: _this.$api.getHomeProjectLink() + '/api/gqz/dashboard/getVersionInfo'
            }).then((res) => {
                if (res.code === 200) {
                    _this.versionInfoList = res.result;
                    _this.versionInfo_0 = _this.versionInfoList[0];
                    _this.versionInfo_1 = _this.versionInfoList[1];
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

