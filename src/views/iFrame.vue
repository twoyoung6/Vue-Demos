<template>
  <div class="iframe">
    <iframe
      id="forum"
      class="iframe"
      src="https://wappass.baidu.com/passport/#/reg"
      frameborder="0"
      width="100%"
      height="auto"
      scrolling="no"
    />
  </div>
</template>

<script>
export default {
  name: "Iframe",
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