<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/images/logo.png" />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border: 5px dashed #db3737;
  min-height: 100vh;
  box-sizing: border-box;
  img {
    width: 300px;
  }
}
</style>
