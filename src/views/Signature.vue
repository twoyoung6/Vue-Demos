<template>
  <div class="signature_page">
    <div class="signatureEthnic">
      <span class="title">请点击签名</span>
      <div class="platte_part" @click="showSign = true">
        <div class="palette" id="printTest" ref="printTest">
          <img class="rotate_img" v-if="signImg" :src="signImg" />
          <van-popup
            v-model="showSign"
            position="top"
            :style="{ height: '100%' }"
          >
            <div class="wrapper" @click.stop>
              <div class="block">
                <div class="block_buttons">
                  <div class="save_reset">
                    <div class="clear_button" @click="resetSign">
                      <span>清</span><span>除</span>
                    </div>
                    <div class="save_button" @click="getSign">
                      <span>保</span><span>存</span>
                    </div>
                  </div>
                  <div class="color_button_group">
                    <div
                      :class="[
                        { active: lineColor == '#000000' },
                        'black_button',
                      ]"
                      @click="changeLineColor('#000000')"
                    ></div>
                    <div
                      :class="[
                        { active: lineColor == '#1A77FE' },
                        'blue_button',
                      ]"
                      @click="changeLineColor('#1A77FE')"
                    ></div>
                    <div
                      :class="[
                        { active: lineColor == '#DF3031' },
                        'red_button',
                      ]"
                      @click="changeLineColor('#DF3031')"
                    ></div>
                  </div>
                </div>
                <div class="block_palette">
                  <vue-esign
                    ref="signSheet"
                    :width="paletteWidth"
                    :height="paletteHeight"
                    :isCrop="true"
                    :lineWidth="6"
                    :lineColor="lineColor"
                    bgColor.sync="#F4F5F7"
                  />
                </div>
                <div class="block_title">
                  <div>
                    <span>请</span><span>绘</span><span>制</span><span>清</span
                    ><span>晰</span> <span>可</span><span>辨</span
                    ><span>的</span><span>签</span><span>名</span>
                  </div>
                </div>
              </div>
            </div>
          </van-popup>
        </div>
      </div>
      <p>添加电子签名，自动生成个人授权委托书</p>
    </div>
    <div class="button_large">
      <van-button size="mini" type="info" @click="onSubmit" v-print="printObj"
        >确定</van-button
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import vueEsign from "vue-esign";
import { Popup } from "vant";
Vue.use(vueEsign).use(Popup);
export default {
  name: "signature",
  data() {
    return {
      signImg: "",
      showSign: false,
      lineColor: "#000000",

      printObj: {
        id: "printTest", //绑定打印区域的id
        preview: false, // 开启打印预览,
        previewTitle: "打印预览", // 打印预览标题
        popTitle: "电子签名打印", //内容标签，可以设计页眉
        //调用打印工具前的回调函数
        beforeOpenCallback(vue) {
          vue.printLoading = true;
          console.log("打开之前");
        },
        //调用打印工具成功回调函数
        openCallback(vue) {
          vue.printLoading = false;
          console.log("执行了打印");
        },
        //关闭打印机的回调
        closeCallback(vue) {
          console.log("关闭了打印工具");
        },
      },
    };
  },
  computed: {
    paletteWidth(val) {
      return window.innerWidth;
    },
    paletteHeight(val) {
      return 1200;
    },
  },
  methods: {
    changeLineColor(color) {
      this.lineColor = color;
    },
    resetSign() {
      this.$refs.signSheet.reset();
    },

    // 图片旋转 操作
    rotateBase64Img(src, edg, callback) {
      let canvas = document.createElement("canvas"); // 创建一个canvas对象
      let ctx = canvas.getContext("2d"); // 获得渲染上下文和他的绘画功能
      let imgW; //图片宽度
      let imgH; //图片高度
      let size; //canvas初始大小
      if (edg % 90 != 0) {
        console.error("旋转角度必须是90的倍数!");
        throw "旋转角度必须是90的倍数!";
      }
      edg < 0 && (edg = (edg % 360) + 360);
      const quadrant = (edg / 90) % 4; //旋转象限
      const cutCoor = { sx: 0, sy: 0, ex: 0, ey: 0 }; //裁剪坐标
      let image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;
      image.onload = function () {
        imgW = image.width;
        imgH = image.height;
        size = imgW > imgH ? imgW : imgH;

        canvas.width = size * 2;
        canvas.height = size * 2;
        switch (quadrant) {
          case 0:
            cutCoor.sx = size;
            cutCoor.sy = size;
            cutCoor.ex = size + imgW;
            cutCoor.ey = size + imgH;
            break;
          case 1:
            cutCoor.sx = size - imgH;
            cutCoor.sy = size;
            cutCoor.ex = size;
            cutCoor.ey = size + imgW;
            break;
          case 2:
            cutCoor.sx = size - imgW;
            cutCoor.sy = size - imgH;
            cutCoor.ex = size;
            cutCoor.ey = size;
            break;
          case 3:
            cutCoor.sx = size;
            cutCoor.sy = size - imgW;
            cutCoor.ex = size + imgH;
            cutCoor.ey = size + imgW;
            break;
        }
        ctx.translate(size, size);
        ctx.rotate((edg * Math.PI) / 180);
        ctx.drawImage(image, 0, 0);
        let imgData = ctx.getImageData(
          cutCoor.sx,
          cutCoor.sy,
          cutCoor.ex,
          cutCoor.ey
        );
        if (quadrant % 2 == 0) {
          canvas.width = imgW;
          canvas.height = imgH;
        } else {
          canvas.width = imgH;
          canvas.height = imgW;
        }
        ctx.putImageData(imgData, 0, 0);
        callback(canvas.toDataURL());
      };
    },

    // 保存签名
    getSign() {
      this.$refs.signSheet
        .generate()
        .then((res) => {
          // 旋转 -90 度
          this.rotateBase64Img(res, "-90", (resImg) => {
            this.signImg = resImg;
            this.showSign = false;
          });
        })
        .catch((err) => {
          this.$toast("请签名！");
        });
    },

    // 提交民族成分申请签名
    onSubmit() {
      if (!this.signImg) this.$toast("请点击签名!");
      console.log("签名图片-----", this.signImg);
    },
  },
};
</script>

<style  lang="scss" scoped>
.signatureEthnic {
  background: #ffffff;
  margin-top: 10px;
  padding: 0px 32px;

  .title {
    font-size: 32px;
    line-height: 25px;
    font-weight: 500;
    color: rgb(241, 88, 88);
    letter-spacing: 4px;
  }

  .platte_part {
    text-align: center;
    padding: 30px;
  }

  p {
    margin-top: 23px;
    text-align: center;
    height: 48px;
    font-size: 32px;
    font-weight: 400;
    color: #7f7f7f;
    line-height: 48px;
  }
}

.palette {
  background: url("../assets/images/signature_bg.jpg") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 300px;
  display: inline-block;
  vertical-align: bottom;
}

.rotate_img {
  width: 500px;
  height: 300px;
}

.button_large {
  margin: 32px 32px;

  >>> .van-button--large {
    background: linear-gradient(90deg, #4978ff 0%, #4cb2ff 100%);
    border-radius: 8px;
    border: none;
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block > div:first-child {
  height: 100%;
  opacity: 0.8;
  border-right: 2px solid #979797;
  background: #f4f5f7;
}

.block_title {
  background: #000000;
  opacity: 0.8;
  padding: 93px 12px;
  font-size: 32px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
  box-sizing: border-box;
}

.block_title > div {
  span {
    margin-bottom: 12px;
    color: #ffffff;
    display: block;
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    /* Internet Explorer 9*/
    -moz-transform: rotate(90deg);
    /* Firefox */
    -webkit-transform: rotate(90deg);
    /* Safari 和 Chrome */
    -o-transform: rotate(90deg);
    /* Opera */
  }

  span:first-child {
  }
}

.block {
  background-color: #fff;
  height: 100%;
  width: 100%;
  display: flex;

  .block_palette {
    flex: 8;
    height: 100%;
    overflow: hidden;
  }

  div {
    flex: 1;
  }

  .block_buttons {
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
  }

  .clear_button,
  .save_button {
    margin: 0 8px;
    border-radius: 12px;
    border: 1px solid #4978ff;
    padding: 93px 12px;
    font-size: 32px;

    span {
      color: #4979ff;
      display: block;
      transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      /* Internet Explorer 9*/
      -moz-transform: rotate(90deg);
      /* Firefox */
      -webkit-transform: rotate(90deg);
      /* Safari 和 Chrome */
      -o-transform: rotate(90deg);
      /* Opera */
    }

    span:first-child {
      margin-bottom: 7px;
    }
  }

  .clear_button {
    margin-bottom: 5px;
  }

  .color_button_group {
    position: absolute;
    bottom: 5%;

    div {
      width: 35px;
      height: 35px;
      margin: 16px 8px;
      border-radius: 50%;
      border: 6px solid #cecbcb;
      opacity: 0.6;
      transition: all ease 0.5s;
      &.active {
        width: 40px;
        height: 40px;
        opacity: 1;
      }
    }

    .black_button {
      background-color: #000000;
    }

    .blue_button {
      background-color: #1a77fe;
    }

    .red_button {
      background-color: #df3031;
    }
  }
}
</style>
