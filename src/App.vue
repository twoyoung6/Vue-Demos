<template>
  <div id="app">
    <template v-if="onLine">
      <van-grid clickable>
        <van-grid-item
          :text="item.name"
          v-for="(item, index) in routes"
          :key="index"
          @click="click(item)"
        />
      </van-grid>
      <keep-alive><router-view /></keep-alive>
      <!-- iframe页 -->
      <component
        v-for="item in hasOpenComponentsArr"
        :key="item.name"
        :is="item.name"
        v-show="$route.path === item.path"
      />
    </template>
    <!-- 网络状态监听 -->
    <Net v-if="!onLine" />
  </div>
</template>

<script>
import Vue from "vue";
import Net from "./components/Net";
export default {
  name: "App",
  components: { Net },
  data() {
    return {
      componentsArr: [], // 含有iframe的页面
      activeTab: "/", // 当前激活的 router path
      routes: [],
      onLine: navigator.onLine, // 默认网络在线状态
      icon: require("assets/images/500.gif"),
    };
  },
  computed: {
    // 实现懒加载，只渲染已经打开过（hasOpen:true）的iframe页
    hasOpenComponentsArr() {
      return this.componentsArr.filter((item) => item.hasOpen);
    },
  },
  watch: {
    $route() {
      // 判断当前路由是否iframe页
      this.isOpenIframePage();
    },
  },
  methods: {
    // 根据当前路由设置hasOpen
    isOpenIframePage() {
      const target = this.componentsArr.find((item) => {
        return item.path === this.$route.path;
      });
      if (target && !target.hasOpen) {
        target.hasOpen = true;
      }
    },
    click(obj) {
      this.activeTab = obj.name;
      this.$router.push(obj.path);
    },
    // 注册网络监听事件
    regOnline() {
      window.addEventListener("online", this.updateOnlineStatus);
      window.addEventListener("offline", this.updateOnlineStatus);
    },
    // 更新网络状态方法
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
    },
    // 刷新当前页面
    refresh() {
      window.location.reload();
    },
  },
  mounted() {
    // 监听页面是刷新了还是关闭了
    let _beforeUnload_time = 0,
      _unload_time = 0;

    window.addEventListener("beforeunload", () => {
      console.log("关闭/刷新前-----");
      _beforeUnload_time = new Date().getTime();
    });

    window.addEventListener("unload", () => {
      console.log("关闭/刷新后-----");
      _unload_time = new Date().getTime();

      if (_unload_time - _beforeUnload_time > 4) {
        //业务代码
        localStorage.setItem("page_state", "refresh");
      }
    });

    const routes = this.$router.options.routes;
    let iframeArr = [];
    routes.map((it) => {
      if (it.iframeComponent) {
        const name = it.name || it.path.replace("/", "");

        iframeArr.push({
          name: name,
          path: it.path,
          hasOpen: false,
          component: it.iframeComponent,
        });
      }
    });
    iframeArr.forEach((item) => {
      Vue.component(item.name, item.component);
    });
    this.componentsArr = iframeArr;
    console.log(`🍉 ~ mounted ~ componentsArr`, this.componentsArr);

    var mobile = require("is-mobile");
    console.log("是否在移动端运行?----", mobile());
    this.regOnline();
    // 根据注册路由自动生成首页菜单
    this.routes = [].concat(this.$router.options.routes);
    this.routes.shift();
  },
  // 注销网络监听事件
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
};
</script>

<style lang="scss" scoped>
#app {
  overflow-x: hidden;
  box-sizing: border-box;
  font-size: 30px;
  text-align: center;
  color: #2c3e50;
  border: 5px dashed #db3737;
  min-height: 100vh;
  box-sizing: border-box;
  ::v-deep .van-grid-item__text {
    color: #db3737;
    font-weight: 600;
  }
}
#nprogress .bar {
  background: #ff5722 !important; //自定义颜色
}
</style>
