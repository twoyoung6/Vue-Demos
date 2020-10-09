<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/images/logo.png" />
    <van-grid :border="false" clickable>
      <van-grid-item
        icon="smile"
        :text="item.name"
        v-for="(item, index) in routes"
        :key="index"
        :to="item.path"
      />
    </van-grid>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      routes: [],
    };
  },
  mounted() {
    // 根据注册路由自动生成首页菜单
    this.routes = [].concat(this.$router.options.routes);
    this.routes.shift();
  },
};
</script>

<style lang="scss">
#app {
  font-size: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border: 5px dashed #db3737;
  min-height: 100vh;
  box-sizing: border-box;
  img {
    width: 200px;
  }
  .van-grid-item__icon {
    color: #ff5722;
  }
}
</style>
