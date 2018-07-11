<style>
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
        margin: 20px 0 0 30px;
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
</style>
<template>
  <div>
      <el-row :gutter="20">
          <el-col :span="9">
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
                      <i class="count">56</i>
                  </div>
                  <div class="left-data-div">
                      <span>视频数量：</span>
                      <i class="count">13</i>
                  </div>
                  <div class="left-data-div">
                      <span>表情包数量：</span>
                      <i class="count">56</i>
                  </div>
              </el-card>
              <el-card class="box-card-left">
                  <div slot="header" class="clearFix">
                      <span>资源站 - 新增资源数据统计（月统计）</span>
                  </div>
                  <div style="margin-top: -9px;">
                      <span>图片上传占比：</span>
                      <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="#67C23A" class="stroke-style"></el-progress>
                  </div>
                  <div style="margin-top: 10px;">
                      <span>视频上传占比：</span>
                      <el-progress :text-inside="true" :stroke-width="18" :percentage="30" color="rgba(142, 113, 199, 0.7)" class="stroke-style"></el-progress>
                  </div>
                  <div style="margin-top: 10px;">
                      <span>表情包上传占比：</span>
                      <el-progress :text-inside="true" :stroke-width="18" :percentage="57.3" color="rgb(32, 160, 255)" class="stroke-style"></el-progress>
                  </div>
              </el-card>
          </el-col>
          <el-col :span="12">
              <el-card class="box-card-right">
                  <div slot="header" class="clearFix">
                      <span>最近登录的用户</span>
                  </div>
                  <div style="margin-top: -15px;">
                      <el-table
                          :data="userTableData"
                          style="width: 100%">
                          <el-table-column
                              prop="date"
                              label="日期">
                          </el-table-column>
                          <el-table-column
                              prop="userName"
                              label="用户ID">
                          </el-table-column>
                          <el-table-column
                              prop="loginIp"
                              label="登录IP">
                          </el-table-column>
                      </el-table>
                  </div>
              </el-card>
              <el-card class="box-card-right">
                  <span style="margin-bottom: 10px; display: inline-block;">近期上线功能</span>
                  <el-collapse v-model="activeNames">
                      <el-collapse-item title="2018.07.06 14:54:23" name="1">
                          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                      </el-collapse-item>
                      <el-collapse-item title="反馈 Feedback" name="2">
                          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                      </el-collapse-item>
                  </el-collapse>
              </el-card>
          </el-col>
      </el-row>
  </div>
</template>
<script>
export default {
    data() {
        return {
            bannerList: [
                { imgUrl: require('../../assets/admin-banner/banner-1.jpg'), title: 'banner_1' },
                { imgUrl: require('../../assets/admin-banner/banner-2.jpg'), title: 'banner_2' },
                { imgUrl: require('../../assets/admin-banner/banner-3.jpg'), title: 'banner_3' }
            ],
            activeNames: ['1'],
            userTableData: [
                { date: '2018.07.06 14:54:23', userName: 'dragon' },
                { date: '2018.07.06 14:54:23', userName: 'dragon' },
                { date: '2018.07.06 14:54:23', userName: 'dragon' },
                { date: '2018.07.06 14:54:23', userName: 'dragon' },
                { date: '2018.07.06 14:54:23', userName: 'dragon' }
            ]
        };
    },
    created() {
    },
    methods: {
    }
};
</script>

