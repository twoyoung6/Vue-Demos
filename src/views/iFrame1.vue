<template>
  <div class="iframe">
    <iframe
      id="forum"
      class="iframe"
      src="https://testapps.eshiyun.info/facilities-web/#/list-distance/zhangjiajie/908"
      frameborder="0"
      width="100%"
      height="auto"
      scrolling="no"
      allow="geolocation"
    />
  </div>
</template>

<script>
export default {
  name: "Iframe1",
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
}
</style>