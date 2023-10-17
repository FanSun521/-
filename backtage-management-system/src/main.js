import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import "./api/mock";
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App),
  router,
  store,
  mounted() {
    // 监听页面已经重新加载
    window.addEventListener("load", () => {
      // 重新添加路由
      store.commit("setRouter", router);
    });
  },
}).$mount("#app");
