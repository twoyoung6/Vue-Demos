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
    <DestinationMap
      :show.sync="show"
      :dlat="dlat"
      :dlng="dlng"
      :mode="mode"
    ></DestinationMap>
  </div>
</template>
<script>
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
};
</script>
<style lang="css" scoped>
</style>