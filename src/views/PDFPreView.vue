<template>
  <!-- 工程内使用 -->
  <div class="view">
    <div class="pdf">
      <pdf
        ref="pdf"
        :src="pdfUrl"
        v-for="index in numPages"
        :key="index"
        :page="index"
        @page-loaded="pageLoaded($event)"
      ></pdf>
      <pdfs
        v-for="i in numPages"
        :key="i"
        :src="pdfSrc"
        :page="i"
        frameborder="0"
      ></pdfs>
    </div>
  </div>
  <!-- npm 插件引入 -->
  <!-- <PdfView
    url="https://zs.sjz.gov.cn/fileService/housebucket/1655341931126.pdf"
  ></PdfView> -->
</template>

<script>
import pdf from "vue-pdf";

import pdfs from "vue-pdf-signature"; // 中文PDF加载空白引入依赖
import CMapReaderFactory from "vue-pdf-signature/src/CMapReaderFactory.js";

export default {
  name: "PDFPreView",
  components: { pdf, pdfs },
  data() {
    return {
      toast: null,
      show: false,
      hasLoaded: false,
      loadMessage: "文档加载中...",
      numPages: null, // pdf 总页数
      curPageNum: 0,
      pdfUrl: "./staic/1655341931126.pdf",
      pdfSrc: "",
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
    // vue-pdf 使用
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

    // vue-pdf-signature 使用
    getNumPages2() {
      // 1.解决中文PDF加载空白并报错：
      this.pdfSrc = pdfs.createLoadingTask({
        url: this.pdfUrl,
        CMapReaderFactory,
      });

      // 2.解决PDF存在分页，进行分页加载
      pdfs.createLoadingTask(this.pdfUrl).promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });
    },
  },
  mounted() {
    this.getNumPages();
    this.getNumPages2(); // vue-pdf-signature 使用
  },
};
</script>

<style lang="scss" scoped>
.view {
}
</style>