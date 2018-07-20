<template lang="html">
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "./assets/style/rules.scss";
    html, body, .warp {
        padding: 0;
        margin: 0;
        height: 100%;
    }
    body>div:first-child {
        height: 100%;
    }
</style>

