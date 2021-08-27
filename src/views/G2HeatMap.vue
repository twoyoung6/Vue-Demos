<template>
  <div id="container" />
</template>

<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
const GeoJSON = require("../assets/data.json");
export default {
  methods: {
    init() {
      const chart = new Chart({
        container: "container",
        autoFit: true,
        width: "auto",
        height: 320,
        padding: 0,
      });
      // 同步度量
      chart.scale({
        latitude: { sync: true },
        longitude: { sync: true },
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip(false);

      // 多 View 叠加
      // 1.0 首先绘制地图背景，使用包含地图经纬度的数据 GeoJSON；
      const userData = [];
      const geoDv = new DataSet.View()
        .source(GeoJSON, {
          type: "GeoJSON",
        })
        .transform({
          // 用户数据处理
          type: "map",
          callback(row) {
            userData.push({
              longitude: row.centroidX,
              latitude: row.centroidY,
              name: row.name,
              value: Math.random() * 1000, // 随机生成用户数量（实际应用中替换成接口异步数据即可
            });
            return row;
          },
        });
      const geoView = chart.createView();
      geoView.data(geoDv.rows);
      geoView
        .polygon()
        .position("longitude*latitude")
        .color("#5bb3e9")
        .style({
          lineWidth: 1,
          stroke: "#fff",
        })
        .label("name", {
          offset: 0,
          style: {
            fill: "#333",
          },
        });
      // 2.0 然后再可视化用户数据
      const userView = chart.createView();
      userView.data(userData);
      userView
        .heatmap()
        .position("longitude*latitude")
        .color(
          "value",
          "#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2"
        )
        .size(500 / 20)
        .style({
          blur: 500 / 15,
        })
        .animate({
          leave: {
            animation: "fade-out",
          },
        });
      userView.interaction("element-active");
      chart.render();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>