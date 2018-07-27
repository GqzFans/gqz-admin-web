<style rel="stylesheet/scss" lang="scss" scoped>
    html, body, .warp {
        height: 100%;
    }
    body>div:first-child {
        height: 100%;
    }
    .left-menu {
        height: 100%;
    }
    .left-menu-width {
        width: 220px;
        height: 100%;
    }
    .el-menu-vertical-demo {
        height: 100% !important;
    }
    .w-top {
        height: 56px;
        width: 100%;
        background-color: rgb(84, 92, 100);
    }
    .w-top-title {
        color: azure;
        font-family: "Microsoft YaHei";
        font-size: 13pt;
        text-shadow: 0 0 0.2em #F87, 0 0 0.2em #F87;
        margin: 17px 0 0 0;
        display: inline-block;
    }
    .w-top-drop-down {
        line-height: 62px;
        float: right;
        color: #FFF;
        margin-left: 13px;
    }
    .w-top-user {
        line-height: 60px;
        float: right;
        font-size: 14px;
        color: #FFF;
    }
    .showBtn {
        height: 30px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        font-size: 12px;
        line-height: 30px;
        color: #FFF;
    }
    .menu-icon-font {
        height: 50px;
        width: 100%;
        font-size: 14px;
        .menu-icon-font {
            font-size: 14px;
            &:before {
                transform: rotate(90deg);
                display: inline-block;
                transition: all .1s ease;
            }
        }
    }
    .route-box-style {
        position: absolute;
        display: inline-block;
    }
</style>
<template>
    <div class="warp" id="app">
        <el-header class="w-top">
            <span class="w-top-title">{{GLOBAL_DOMAIN_INFO}}</span>
            <el-dropdown class="w-top-drop-down">
                <i class="el-icon-setting"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="changePwd()">修改密码</el-dropdown-item>
                    <hr style="width: 80%; border: 1px solid #e8e8e8;"/>
                    <el-dropdown-item @click.native="logOut()">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span class="w-top-user">{{userNickName}}</span>
        </el-header>
        <el-row class="left-menu">
            <el-col class="left-menu-width">
                <el-menu
                    :collapse="isCollapse"
                    :router="true"
                    :default-active='activeId'
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="0" :route='{path: mainMenuList[0].path}'>
                        <i class="el-icon-info"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>内容管理</span>
                        </template>
                        <el-menu-item-group title="图片系列">
                            <el-menu-item index="1-1" :route='{path: contentMenuList[0].path}'>图片管理</el-menu-item>
                            <el-menu-item index="1-2" :route='{path: contentMenuList[1].path}'>表情包管理</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="视频系列">
                            <el-menu-item index="1-3" :route='{path: contentMenuList[2].path}'>视频管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>系统管理</span>
                        </template>
                        <el-menu-item index="2-1" :route='{path: systemMenuList[0].path}'>用户管理</el-menu-item>
                        <el-menu-item index="2-2" :route='{path: systemMenuList[1].path}'>意见反馈</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" class="route-box-style">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    // 获取用户Cookie信息
    import MyCookies from 'src/utils/MyCookies';
    // 调用登出方法
    import LogOut from 'src/utils/LogOut';
    export default {
        data() {
            return {
                isCollapse: false,
                userNickName: '',
                // fixme 这里不应该这样写，没有易用性，考虑后期维护
                menuList: [],
                mainMenuList: [
                    {id: '0', path: '/dashboard'} // 首页
                ],
                contentMenuList: [
                    {id: '1-1', path: '/content/toImage'}, // 图片管理
                    {id: '1-2', path: '/content/toEmoticon'}, // 图片管理
                    {id: '1-3', path: '/content/toVideo'} // 图片管理
                ],
                systemMenuList: [
                    {id: '2-1', path: '/system/toUserManagement'}, // 用户管理
                    {id: '2-2', path: '/system/toFeedback'} // 意见反馈
                ]
            };
        },
        created() {
            this.getUserInfo();
        },
        computed: {
            activeId() {
                let _this = this;
                _this.menuList = [].concat(_this.mainMenuList).concat(_this.contentMenuList).concat(_this.systemMenuList);
                // console.log('menuList = ', _this.menuList);
                // 根据路由匹配选中项
                var activeId = null;
                _this.menuList.forEach((item) => {
                    if (item.path === _this.$route.path) {
                        activeId = item.id;
                    }
                });
                return activeId;
            }
        },
        methods: {
            getUserInfo() {
                var nowCookie = MyCookies.getNowCookie();
                // console.log('nowCookie', nowCookie);
                if (nowCookie.token === null || nowCookie.token === '') {
                    this.$message.error('请重新登录');
                    this.$router.push({ name: 'login' });
                } else {
                    this.userNickName = nowCookie.userInfo.userNickName;
                }
            },
            logOut() {
                LogOut();
            },
            changePwd() {
                this.$router.push({name: 'userChangePwd'});
            }
        }
    };
</script>
