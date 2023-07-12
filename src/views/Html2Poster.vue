<template>
  <div class="poster">
    <!-- 海报html元素 -->
    <div
      id="posterHtml"
      :style="{ backgroundImage: 'url(' + posterHtmlBg + ')' }"
    >
      <div class="content">
        <div class="text">{{ posterContent }}</div>
        <!-- 二维码 -->
        <img class="qrcode" :src="qr" />
      </div>
    </div>
    <van-button size="mini" type="danger" class="share" @click="share"
      >分享海报</van-button
    >
    <img class="posterImg" :src="posterImg" alt="" v-show="posterImg" />
    <van-button size="mini" class="share" @click="scanQr"
      >识别二维码</van-button
    >
    <div class="result" v-html="result"></div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      posterContent: "扫码领福利", // 文案内容
      posterHtmlBg: require("../assets/images/poster.jpg"), // 背景图
      qr: require("../assets/images/qrCode.png"), // 二维码
      posterImg: "", // 最终生成的海报图片
      result: "",
    };
  },
  methods: {
    // 浏览器提供了原生的API BarcodeDetector 来解析二维码
    scanQr() {
      if ("BarcodeDetector" in window) {
        // 创建检测器
        const barcodeDetector = new BarcodeDetector({
          formats: ["qr_code"],
        });
        barcodeDetector
          .detect(this.qr)
          .then((barcodes) => {
            console.log("barcodes", barcodes);
            barcodes.forEach((barcode) => {
              this.result = barcode.rawValue;
            });
          })
          .catch((err) => {
            this.result = `<span class="error">解析出错：${err}</span>`;
          });
      } else {
        this.result = "当前浏览器不支持二维码识别";
      }
    },
    share() {
      // 生成海报
      const vm = this;
      const domObj = document.getElementById("posterHtml");
      // 获取目标元素高宽
      const w = parseInt(window.getComputedStyle(domObj).width);
      const h = parseInt(window.getComputedStyle(domObj).height);
      // 创建画布
      const canvas2 = document.createElement("canvas");
      const context = canvas2.getContext("2d");
      //将canvas画布放大2倍，然后盛放在较小的容器内，就显得不模糊了
      context.scale(2, 2);
      canvas2.width = w * 2;
      canvas2.height = h * 2;
      html2canvas(domObj, {
        canvas: canvas2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        letterRendering: true,
        onclone(doc) {
          let e = doc.querySelector("#posterHtml");
          e.style.display = "block";
        },
      }).then(function (canvas) {
        // 在微信里,可长按保存或转发
        vm.posterImg = canvas.toDataURL("image/png");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.poster {
  background: #333;
  padding: 30px;
  #posterHtml {
    position: relative;
    width: 100%;
    height: 987px;
    background-size: cover;
  }
  .content {
    position: absolute;
    top: 20px;
    left: 30px;
  }
  .text {
    color: #fff;
    font-size: 30px;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }
  .qrcode {
    width: 160px;
    height: 160px;
  }
  .share {
    margin: 20px 0;
  }
  .posterImg {
    width: 100%;
    height: 987px;
    object-fit: cover;
    border: none;
  }
  .result {
    color: snow;
  }
}
</style>