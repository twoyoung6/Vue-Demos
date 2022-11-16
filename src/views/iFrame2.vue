<template>
  <div class="iframe">
    <img :src="pngUrl" alt="" />
    <iframe
      id="forum"
      class="iframe"
      src="https://passport.csdn.net/signwap?code=one"
      frameborder="0"
      width="100%"
      height="auto"
      scrolling="no"
    />
  </div>
</template>

<script>
import localforage from "localforage";
export default {
  name: "Iframe2",
  data() {
    return {
      pngUrl: null,
    };
  },
  methods: {
    // localforage 存储/获取复杂数据、二进制流
    async localforageGet() {
      let data = await localforage.getItem("globalData");
      console.log(`🍉 ~ localforageGet ~ data`, data);
      let png = await localforage.getItem("pic");
      this.pngUrl = png;
      console.log(`🍉 ~ localforageGet ~ png`, png);
    },
  },
  created() {
    this.localforageGet();
  },
};
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: auto;
  min-height: 100vh;
  border: none;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
  text-align: center;
  img {
    width: 200px;
    height: 200px;
  }
}
</style>