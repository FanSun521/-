import Cookies from "js-cookie";
export default {
  state: {
    isCollapse: false, //控制左侧菜单栏的展开与折叠
    breadList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ], //面包屑
    // 动态菜单
    menu: [],
  },
  mutations: {
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    changeBreadList(state, li) {
      if (li.path !== "/" && li.path !== "/home") {
        if (!state.breadList.includes(li)) {
          state.breadList.push(li);
        }
      }
    },
    deleteBread(state, index) {
      state.breadList.splice(index, 1);
    },
    resetBread(state) {
      state.breadList = [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
      ];
    },
    setMenu(state, menu) {
      state.menu = menu;
      // 缓存菜单 防止浏览器刷新菜单丢失
      Cookies.set("menu", JSON.stringify(menu));
    },
    setRouter(state, router) {
      const menu =
        state.menu.length !== 0
          ? state.menu
          : JSON.parse(Cookies.get("menu") ?? 0);
      const routes = [];
      function combineRoute(menuArray) {
        if (menuArray) {
          menuArray.forEach((item) => {
            if (!item.children) {
              const route = {};
              ({ path: route.path, name: route.name } = item);
              // 动态引入路由
              route.component = () => import(`../views/${item.url}`);
              routes.push(route);
            } else {
              combineRoute(item.children);
            }
          });
        }
      }
      combineRoute(menu);
      routes.forEach((item) => {
        router.addRoute("main", item);
      });
    },
  },
};
