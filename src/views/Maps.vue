<template>
  <div>
    <van-button
      icon="map-marked"
      round
      color="linear-gradient(to right, #8BC34A, #009688)"
      @click="show = !show"
    >
      使用其他导航
    </van-button>
    <van-button @click="open">唤起小程序地图</van-button>
    <DestinationMap
      :show.sync="show"
      :dlat="dlat"
      :dlng="dlng"
      :mode="mode"
    ></DestinationMap>
  </div>
</template>
<script>
import wx from "../common/JSSDK";
import { client } from "../common/utils";
import DestinationMap from "../components/DestinationMap";
export default {
  name: "Maps",
  components: { DestinationMap },
  data() {
    return {
      dlat: "27.246876",
      dlng: "112.733821",
      mode: 3,
      show: false,
    };
  },
  methods: {
    open() {
      if (client() == "wechat") {
        let wxCtx = wx.createMapContext();
        console.log("wxCtx---", wxCtx);
      }
    },
  },
  mounted() {
    client();
  },
};
</script>
<style lang="css" scoped>
</style>