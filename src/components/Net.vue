<template>
  <div class="statusImg">
    <img :src="icon" alt="500" />
    <van-button size="mini" plain @click="refresh">刷新重新加载</van-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.statusImg {
  img {
    width: 100vw;
    object-fit: cover;
    height: auto;
    margin-top: 30%;
  }
}
</style>