<template>
  <!-- 工程内使用 -->
  <!-- <div class="view">
    <div class="pdf">
      <pdf
        ref="pdf"
        :src="pdfUrl"
        v-for="index in numPages"
        :key="index"
        :page="index"
        @page-loaded="pageLoaded($event)"
      ></pdf>
    </div>
  </div> -->
  <!-- npm 插件引入 -->
  <PdfView
    url="https://tencentcloud-1251529838.cos.ap-beijing.myqcloud.com/%E3%80%90%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88_%E9%95%BF%E6%B2%99%E3%80%91Alyson%204%E5%B9%B4.pdf"
  ></PdfView>
</template>

<script>
// import pdf from "vue-pdf";
export default {
  name: "PDFPreView",
  // components: { pdf },
  data() {
    return {
      toast: null,
      show: false,
      hasLoaded: false,
      loadMessage: "文档加载中...",
      numPages: null, // pdf 总页数
      curPageNum: 0,
      pdfUrl:
        "http://qgqa73lvg.hn-bkt.clouddn.com/JS%E6%A0%87%E5%87%86%E8%83%BD%E5%8A%9B%E8%AF%B4%E6%98%8E.pdf",
    };
  },
  watch: {
    curPageNum: {
      handler: function (val) {
        if (this.numPages == val) {
          this.toast.clear(); // 当最后加载完的页面数等于 总页面数 清除 toast
        }
      },
    },
  },
  methods: {
    // 某一个 pdf 加载成功回调
    pageLoaded(num) {
      // num 为 当前加载完的页面数
      this.curPageNum = num;
    },
    // 计算pdf页码总数(显示同一pdf文档的多个页面)
    getNumPages() {
      this.hasLoaded = false;
      this.toast = this.$toast({
        type: "loading",
        loadingType: "spinner",
        duration: 0,
        overlay: true,
        message: this.loadMessage,
        forbidClick: true,
      });
      const loadingTask = pdf.createLoadingTask(this.pdfUrl);
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
    // this.getNumPages();
  },
};
</script>

<style lang="scss" scoped>
.view {
}
</style>