<template>
  <div id="app">
    <template v-if="onLine">
      <van-grid clickable>
        <van-grid-item
          icon="smile"
          :text="item.name"
          v-for="(item, index) in routes"
          :key="index"
          :to="item.path"
        />
      </van-grid>
      <router-view></router-view>
    </template>
    <div class="statusImg" v-if="!onLine">
      <img :src="icon" alt="500" />
      <van-button plain size="small" @click="refresh">刷新重新加载</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      routes: [],
      onLine: navigator.onLine, // 默认网络在线状态
      icon: require("assets/images/500.gif"),
    };
  },
  methods: {
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
  text-align: center;
  color: #2c3e50;
  border: 5px dashed #db3737;
  min-height: 100vh;
  box-sizing: border-box;
  ::v-deep .van-grid {
    align-items: flex-start;
    .van-grid-item__icon {
      color: #ff5722;
    }
  }
  ::v-deep .van-grid-item__content--center {
    justify-content: flex-start;
  }
  img {
    width: 200px;
  }
  .statusImg {
    img {
      width: 100vw;
      object-fit: cover;
      height: auto;
      margin-top: 30%;
    }
  }
}
</style>
