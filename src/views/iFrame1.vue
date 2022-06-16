<template>
  <div class="iframe">
    <iframe
      id="forum"
      class="iframe"
      src="http://172.16.124.174:8021/#/?authCode=5f2923715f062820e5dd3ac11652855619_5101"
      frameborder="0"
      width="100%"
      height="auto"
      scrolling="no"
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