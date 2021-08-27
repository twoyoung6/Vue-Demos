<template>
  <div id="map" />
</template>

<script>
import { Scene, Popup } from "@antv/l7";
import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
export default {
  methods: {
    initMap() {
      const colors = [
        "rgb(254,237,222)",
        "rgb(253,190,133)",
        "rgb(203,191,60)",
        "rgb(210,85,13)",
        "rgb(164,5,0)",
      ];
      const ProvinceData = [
        {
          name: "云南省",
          code: 530000,
          value: 17881.12,
        },
        {
          name: "黑龙江省",
          code: 230000,
          value: 16361.62,
        },
        {
          name: "贵州省",
          code: 520000,
          value: 14806.45,
        },
        {
          name: "北京市",
          code: 110000,
          value: 30319.98,
        },
        {
          name: "河北省",
          code: 130000,
          value: 36010.27,
        },
        {
          name: "山西省",
          code: 140000,
          value: 16818.11,
        },
        {
          name: "吉林省",
          code: 220000,
          value: 15074,
        },
        {
          name: "宁夏回族自治区",
          code: 640000,
          value: 3705.18,
        },
        {
          name: "辽宁省",
          code: 210000,
          value: 25315.35,
        },
        {
          name: "海南省",
          code: 460000,
          value: 4832.05,
        },
        {
          name: "内蒙古自治区",
          code: 150000,
          value: 17289.22,
        },
        {
          name: "天津市",
          code: 120000,
          value: 18809.64,
        },
        {
          name: "新疆维吾尔自治区",
          code: 650000,
          value: 12199.08,
        },
        {
          name: "上海市",
          code: 310000,
          value: 32679.87,
        },
        {
          name: "陕西省",
          code: 610000,
          value: 24438.32,
        },
        {
          name: "甘肃省",
          code: 620000,
          value: 8246.07,
        },
        {
          name: "安徽省",
          code: 340000,
          value: 30006.82,
        },
        {
          name: "香港特别行政区",
          code: 810000,
          value: 0,
        },
        {
          name: "广东省",
          code: 440000,
          value: 97277.77,
        },
        {
          name: "河南省",
          code: 410000,
          value: 48055.86,
        },
        {
          name: "湖南省",
          code: 430000,
          value: 36425.78,
        },
        {
          name: "江西省",
          code: 360000,
          value: 21984.78,
        },
        {
          name: "四川省",
          code: 510000,
          value: 40678.13,
        },
        {
          name: "广西壮族自治区",
          code: 450000,
          value: 20353.51,
        },
        {
          name: "江苏省",
          code: 320000,
          value: 92595.4,
        },
        {
          name: "澳门特别行政区",
          code: 820000,
          value: null,
        },
        {
          name: "浙江省",
          code: 330000,
          value: 56197.15,
        },
        {
          name: "山东省",
          code: 370000,
          value: 76469.67,
        },
        {
          name: "青海省",
          code: 630000,
          value: 2865.23,
        },
        {
          name: "重庆市",
          code: 500000,
          value: 20363.19,
        },
        {
          name: "福建省",
          code: 350000,
          value: 35804.04,
        },
        {
          name: "湖北省",
          code: 420000,
          value: 39366.55,
        },
        {
          name: "西藏自治区",
          code: 540000,
          value: 1477.63,
        },
        {
          name: "台湾省",
          code: 710000,
          value: null,
        },
      ];
      const scene = new Scene({
        id: "map",
        logoVisible: false,
        map: new Mapbox({
          center: [116.2825, 39.9],
          pitch: 0, // 倾斜角度
          style: "blank", // 地图主题
          zoom: 3,
          minZoom: 1,
          maxZoom: 6,
          visible: true,
          controlsVisible: true,
        }),
      });

      scene.on("loaded", () => {
        const layer = new CountryLayer(scene, {
          data: ProvinceData,
          joinBy: ["NAME_CHN", "name"],
          depth: 1,
          autoFit: true,
          provinceStroke: "#fff",
          cityStroke: "#EBCCB4",
          cityStrokeWidth: 1,
          chinaNationalStroke: "#ff0010",
          label: {
            enable: true,
            field: "name",
            size: 10,
            opacity: 1,
            color: "#000",
            stroke: "#fff",
            strokeWidth: 1.2,
            strokeOpacity: 1,
            textAllowOverlap: false,
          },
          fill: {
            color: {
              visible: true,
              field: "value",
              values: colors,
            },
            activeColor: "#ff3eee",
          },
          popup: {
            enable: false,
            triggerEvent: "touchstart",
            Html: (props) => {
              return `<div>${props.NAME_CHN}</div><div>已确诊: ${props.value}</div>`;
            },
          },
          // animate: {
          //   leave: {
          //     animation: "fade-out",
          //   },
          // },
        });
        layer.on("click", (ev) => {
          console.log("ev---", ev);
          let valueObj = ProvinceData.find((val) => {
            return val.code == ev.feature.properties.adcode;
          });
          console.log("valueObj---", valueObj);
          const popup = new Popup();
          var html = `<p>${valueObj.name} </p><p>数值: ${valueObj.value}</p>`;
          popup.setLnglat([ev.lngLat.lng, ev.lngLat.lat]);
          popup.setHTML(html);
          scene.addPopup(popup);
        }); // 鼠标左键点击事件
      });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 60vh;
  position: relative;
  ::v-deep .l7-popup-content {
    padding: 0 30px;
    background: #000;
    color: #fff;
    .l7-popup-close-button {
      position: absolute;
      right: 5px;
      top: 5px;
      border: 0;
      padding: 0;
      font-size: 20px;
      line-height: 20px;
      border-radius: 0 3px 0 0;
      cursor: pointer;
      background-color: transparent;
    }
    p {
      padding: 0;
      margin: 15px 0;
    }
  }
  ::v-deep .l7-popup-tip {
    border-top-color: rgb(83, 82, 82);
  }
}
</style>