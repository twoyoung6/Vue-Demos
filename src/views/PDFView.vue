<template>
  <div class="view">
    <div class="pdf" v-if="hasLoaded">
      <pdf
        ref="pdf"
        :src="pdfUrl"
        v-for="index in numPages"
        :key="index"
        :page="index"
      ></pdf>
    </div>
    <van-loading v-else type="spinner" size="24px" vertical>
      {{ loadMessage }}
    </van-loading>
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  name: "PDFView",
  components: { pdf },
  data() {
    return {
      hasLoaded: false,
      loadMessage: "文档加载中...",
      numPages: null, // pdf 总页数
      pdfUrl:
        "http://qgqa73lvg.hn-bkt.clouddn.com/JS%E6%A0%87%E5%87%86%E8%83%BD%E5%8A%9B%E8%AF%B4%E6%98%8E.pdf",
    };
  },
  methods: {
    // 计算pdf页码总数(显示同一pdf文档的多个页面)
    getNumPages() {
      let loadingTask = pdf.createLoadingTask(this.pdfUrl);
      loadingTask.promise
        .then((pdf) => {
          this.numPages = pdf.numPages;
          this.$nextTick(() => {
            this.hasLoaded = true;
          });
        })
        .catch((err) => {
          this.loadMessage = "文档加载失败";
          this.hasLoaded = false;
        });
    },
  },
  mounted() {
    this.hasLoaded = false;
    this.getNumPages();
  },
};
</script>

<style lang="scss" scoped>
.view {
  /deep/ .van-loading {
    margin-top: 15vh;
  }
}
</style>