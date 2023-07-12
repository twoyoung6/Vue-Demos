<template>
  <div class="tag-canvas">
    <div class="title"></div>
    词云 3D 球
    <div id="myCanvasContainer">
      <canvas
        width="370"
        height="370"
        style="max-width: 380px"
        id="myCanvas"
        ref="canvas"
      >
        <p>换个现代浏览器吧！</p>
      </canvas>
    </div>
    <div id="tags" style="display: none">
      <ul>
        <li v-for="(tag, index) in members" :key="index">
          <a
            href="javascript:void(0)"
            style="height: auto; font-size: 40px; color: #ee0a24"
          >
            {{ tag.name }}
          </a>
        </li>
      </ul>
    </div>
    <van-button size="mini" type="primary" @click="start">开 始</van-button>
    <van-button size="mini" type="danger" @click="stop">停 止</van-button>
  </div>
</template>

<script>
import "@/common/tagcanvas.min";
export default {
  name: "TagCanvas",
  data() {
    return {
      members: [],
      speed: [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)], // 摇号默认速度};
    };
  },
  mounted() {
    for (let i = 0; i < 260; i++) {
      this.members.push({
        id: i,
        name: `学生 ${i}`,
      });
    }
    this.initShake();
  },
  methods: {
    start() {
      TagCanvas.SetSpeed("myCanvas", [5, 1]);
    },
    stop() {
      TagCanvas.SetSpeed("myCanvas", this.speed);
    },
    // 初始化摇号特效
    initShake() {
      this.$nextTick(() => {
        try {
          TagCanvas.Start("myCanvas", "tags", {
            textColour: null, // 字体颜色设置为 null 就会继承 每个 tag的a 标签的字体颜色
            dragControl: 1,
            depth: 0.95,
            textHeight: 11,
            minSpeed: 0.01,
            outlineMethod: "colour", // tag hover 之后的 轮廓效果
            outlineColour: "#1890ff",
            initial: this.speed, // 起始转速
            wheelZoom: false, // 启用使用鼠标滚轮或滚动手势放大和缩小
          });
        } catch (e) {
          // 出错时隐藏
          const dom = document.getElementById("myCanvasContainer");
          if (dom) {
            dom.style.display = "none";
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 300px;
  height: 100px;
  background: #3577fe;
  font-size: 40px;
  font-weight: 600;
  display: grid;
  place-items: center;
  color: #fff;
  margin: 0 auto;
  &:empty::before {
    content: "暂无数据";
    color: snow;
    font-weight: normal;
  }
}
</style>