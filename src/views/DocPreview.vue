<template>
  <div class="preview">
    <h2>移动端 PDF/Word 文件预览</h2>
    <a :href="`http://view.xdocin.com/xdoc?_xdoc=${pdfUrl}`">
      <van-button type="info" block>XDOC PDF预览</van-button>
    </a>

    <a :href="`http://view.xdocin.com/xdoc?_xdoc=${wordUrl}`">
      <van-button type="danger" block>XDOC Word预览</van-button>
    </a>
    <van-button type="warning" block @click="$router.push('/pdfview')">
      vue-pdf 预览
    </van-button>
  </div>
</template>

<script>
export default {
  name: "DocPreview",
  data() {
    return {
      pdfUrl:
        "http://qgqa73lvg.hn-bkt.clouddn.com/JS%E6%A0%87%E5%87%86%E8%83%BD%E5%8A%9B%E8%AF%B4%E6%98%8E.pdf",
      wordUrl:
        "http://qgqa73lvg.hn-bkt.clouddn.com/%E5%B8%82%E6%B0%91%E4%BA%92%E5%8A%A8-%E6%A0%87%E5%87%86%E7%89%88%E4%BA%A4%E6%8E%A5%E6%96%87%E6%A1%A3.docx",
    };
  },
};
</script>

<style lang="scss" scoped>
.preview {
  box-sizing: border-box;
  a {
    margin: 20px;
  }
}
</style>