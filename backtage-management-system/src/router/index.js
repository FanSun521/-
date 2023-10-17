import Vue from "vue";
import VueRouter from "vue-router";
import Cookies from "js-cookie";
//1.导入路由组件
// import Home from "../views/Home.vue";
// import User from "../views/User.vue";
import Main from "../views/Main.vue";
// import Mall from "../views/Mall.vue";
// import PageOne from "../views/PageOne.vue";
// import PageTwo from "../views/PageTwo.vue";
import Login from "../views/Login.vue";
Vue.use(VueRouter);
// 解决跳转相同路由
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

//2.创建路由匹配规则
const routes = [
  // 主路由
  {
    path: "/",
    component: Main,
    name: "main",
    redirect: "/home",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
];

//3.创建路由实例
const router = new VueRouter({
  routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  //身份验证
  if (to.name !== "login" && !Cookies.get("token")) {
    console.log(555);
    next({ name: "login" });
  }
  next();
});
export default router;
