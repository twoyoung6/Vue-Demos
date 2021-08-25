<template>
  <div id="container" />
</template>

<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
export default {
  methods: {
    init() {
      fetch("https://gw.alipayobjects.com/os/antvdemo/assets/data/usa.geo.json")
        .then((res) => res.json())
        .then((GeoJSON) => {
          const chart = new Chart({
            container: "container",
            autoFit: true,
            height: 500,
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
          // 1.0 首先绘制地图背景，使用包含地图经纬度的数据；
          const userData = [];
          const geoDv = new DataSet.View()
            .source(GeoJSON, {
              type: "GeoJSON",
            })
            .transform({
              type: "map",
              callback(row) {
                userData.push({
                  longitude: row.centroidX,
                  latitude: row.centroidY,
                  name: row.name,
                  value: Math.random() * 1000,
                });
                return row;
              },
            });
          const geoView = chart.createView();
          geoView.data(geoDv.rows);
          geoView
            .polygon()
            .position("longitude*latitude")
            .color("#fee")
            .style({
              lineWidth: 1,
              stroke: "#933",
            })
            .label("name", {
              offset: 0,
              style: {
                fill: "#000",
              },
            });
          // 2.0 然后再可视化包含各个国家男女比例的用户数据
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
        });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>