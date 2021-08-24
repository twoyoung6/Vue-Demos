<template>
  <div class="map">
    <van-popup
      v-model="$attrs.show"
      round
      :overlay="false"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="mapIcon">
        <div
          class="map-item"
          v-for="item in mapIcons"
          :key="item.id"
          @click="toApp(item.appName)"
        >
          <img :src="item.icon" alt="tengxun" />
          <p>{{ item.title }}</p>
        </div>
      </div>
      <div class="cancelBtn van-hairline--top" @click="cancel">取消</div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "DestinationMap",
  props: {
    // show 布尔值
    // mode 数值
    // dlat 数值
    // dlng 数值
  },
  data() {
    return {
      show: false,
      mapIcons: [
        {
          id: "0",
          icon: require("../assets/images/tengxun.png"),
          appName: "tengxun",
          title: "腾讯地图",
        },
        {
          id: "1",
          icon: require("../assets/images/gaode.png"),
          appName: "gaode",
          title: "高德地图",
        },
        {
          id: "2",
          icon: require("../assets/images/baidu.png"),
          appName: "baidu",
          title: "百度地图",
        },
      ],
    };
  },
  methods: {
    // 唤起第三方导航 app
    toApp(appName) {
      // 1.0 校验
      if (!this.$attrs.dlat || !this.$attrs.dlng) {
        this.$toast("请传入经纬度.");
        return;
      }
      let mode = this.$attrs.mode || 0; // 默认导航方式 为 驾驶模式 0
      // 2.0 设备类型判断
      let ios = navigator.userAgent.match(/(iPhone|iPod|iPad);?/i);
      let android = navigator.userAgent.match(/android/i);
      let guideType, url;
      // 3.0 导航方式 转换
      guideType = this.guideTypeCope(appName, mode);
      // 4.0 跳转 shemeURL 转换
      switch (appName) {
        case "tengxun":
          url = `qqmap://map/routeplan?type=${guideType}&fromcoord=CurrentLocation&tocoord=${this.$attrs.dlat},${this.$attrs.dlng}&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`;
          break;
        case "gaode":
          if (ios) {
            url = `iosamap://path?t=${guideType}&sourceApplication=appname&dlat=${this.$attrs.dlat}&dlon=${this.$attrs.dlng}&dev=1`;
          } else if (android) {
            url = `amapuri://route/path?t=${guideType}&sourceApplication=appname&dlat=${this.$attrs.dlat}&dlon=${this.$attrs.dlng}&dev=1`;
          }
          break;
        case "baidu":
          if (ios) {
            url = `baidumap://map/direction?mode=${guideType}&destination=${this.$attrs.dlat},${this.$attrs.dlng}&coord_type=bd09ll&type=TIME&src=ios.baidu.openAPIdemo`;
          } else if (android) {
            url = `bdapp://map/direction?mode=${guideType}&destination=${this.$attrs.dlat},${this.$attrs.dlng}&coord_type=bd09ll&type=TIME&src=andr.baidu.openAPIdemo`;
          }
          break;
      }
      console.log(url);
      // 5.0 执行跳转
      window.location.href = url;
      // 6.0 H5 方式检测是否安装对应导航应用
      let timer = setInterval(() => {
        if (!(document.hidden || document.webkitHidden)) {
          this.$toast("请先安装该软件");
        }
        clearTimeout(timer);
      }, 1000);
    },
    // 导航方式统一处理函数
    guideTypeCope(appName, type) {
      let guideType = "";
      switch (appName) {
        case "tengxun":
          switch (type) {
            case 0:
              guideType = "drive";
              break;
            case 1:
              guideType = "bus";
              break;
            case 2:
              guideType = "walk";
              break;
            case 3:
              guideType = "bike";
              break;
          }
          break;
        case "gaode":
          guideType = type;
          break;
        case "baidu":
          switch (type) {
            case 0:
              guideType = "driving";
              break;
            case 1:
              guideType = "transit";
              break;
            case 2:
              guideType = "walking";
              break;
            case 3:
              guideType = "riding";
              break;
          }
          break;
      }
      return guideType;
    },
    cancel() {
      this.$emit("update:show", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.map {
  >>> .van-popup {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(220, 217, 217, 0.15);
  }
  .mapIcon {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 80px 40px 0 40px;
    .map-item {
      img {
        width: 110px !important;
      }
      p {
        padding: 0;
        font-size: 26px;
      }
    }
  }
  .cancelBtn {
    font-size: 30px;
    padding: 40px 0;
    letter-spacing: 6px;
  }
}
</style>