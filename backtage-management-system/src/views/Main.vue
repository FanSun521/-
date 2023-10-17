<template>
  <div>
    <el-container>
      <el-aside width="auto"><CommonNav></CommonNav></el-aside>
      <el-container>
        <el-header><CommonHeader></CommonHeader></el-header>
        <el-main>
          <CommonTag></CommonTag>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonNav from "../components/CommonNav.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTag from "../components/CommonTag.vue";
export default {
  name: "name",
  props: {},
  components: {
    CommonNav,
    CommonHeader,
    CommonTag,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
.el-main {
  padding-top: 0;
}
</style>
