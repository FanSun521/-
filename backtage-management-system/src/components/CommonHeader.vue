<template>
  <div class="head-content">
    <div class="left-content">
      <el-button
        @click="changeCollapse"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <!-- <span class="text">首页</span> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="bread in breadList" :key="bread.path">{{
          bread.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="userPhoto" src="../assets/images/qq头像.jpg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import VueRouter from "vue-router";

import { mapState } from "vuex";
import Cookies from "js-cookie";
export default {
  name: "CommonHeader",
  props: {},
  methods: {
    changeCollapse() {
      this.$store.commit("changeCollapse");
    },
    // 退出登录
    handleCommand(command) {
      console.log(command);
      if (command === "logout") {
        Cookies.remove("token");
        Cookies.remove("menu");
        // 重置面包屑
        this.$store.commit("resetBread");
        // 重置动态路由
        const routes = [
          // 主路由
          {
            path: "/",
            component: () => import("../views/Main.vue"),
            name: "main",
            redirect: "/home",
          },
          {
            path: "/login",
            component: () => import("../views/Login.vue"),
            name: "login",
          },
        ];
        const newRouter = new VueRouter({ routes });
        this.$router.matcher = newRouter.matcher;
        this.$router.push({ name: "login" });
      }
    },
  },
  computed: {
    ...mapState({
      breadList: (state) => state.tab.breadList,
    }),
  },
};
</script>

<style lang="less" scoped>
.head-content {
  display: flex;
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  .left-content {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb {
      margin-left: 10px;
      font-size: 14px;
      color: #666;
      .el-breadcrumb__item:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
  .userPhoto {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
