<template>
  <div style="justify-content: center; position: relative" id="map" />
</template>

<script>
import { Scene } from "@antv/l7";
import { CityLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
export default {
  methods: {
    async initMap() {
      const colors = ["#e8E1FF", "#eDAAFF", "#eD76DD", "#e047A5", "#e01D70"];
      // const response = await fetch(
      //   "https://gw.alipayobjects.com/os/bmw-prod/149b599d-21ef-4c24-812c-20deaee90e20.json"
      // );
      // const provinceData = await response.json();
      // const data = Object.keys(provinceData).map((key) => {
      //   return {
      //     code: key,
      //     name: provinceData[key][0],
      //     pop: provinceData[key][2] * 1,
      //   };
      // });
      const data = [
        {
          code: "430802",
          name: "永定区",
          pop: 500,
        },
        {
          code: "430811",
          name: "武陵源区",
          pop: 1000,
        },
        {
          code: "430821",
          name: "慈利县",
          pop: 200,
        },
        {
          code: "430822",
          name: "桑植县",
          pop: 20,
        },
      ];
      const scene = new Scene({
        id: "map",
        logoVisible: false,
        map: new Mapbox({
          center: [116.2825, 39.9],
          pitch: 0,
          style: "blank",
          zoom: 3,
          minZoom: 3,
          maxZoom: 10,
        }),
      });
      scene.on("loaded", () => {
        new CityLayer(scene, {
          data,
          joinBy: ["adcode", "code"],
          // joinBy: ["NAME_CHN", "name"],
          adcode: ["430800", "430801"],
          depth: 3,
          label: {
            field: "NAME_CHN",
            textAllowOverlap: false,
          },
          fill: {
            color: {
              visible: true,
              field: "pop",
              values: colors,
            },
            activeColor: "#00eeb7",
          },
          popup: {
            enable: true,
            Html: (props) => {
              return `<span>${props.NAME_CHN}:</span><span>${props.pop}</span>`;
            },
          },
        });
      });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style>
</style>