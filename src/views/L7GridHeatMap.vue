<template>
  <div style="justify-content: center; position: relative" id="map" />
</template>

<script>
import { Scene, HeatmapLayer } from "@antv/l7";
import { GaodeMap } from "@antv/l7-maps";
export default {
  methods: {
    init() {
      const scene = new Scene({
        id: "map",
        logoVisible: false,
        map: new GaodeMap({
          style: "blank",
          pitch: 5,
          center: [110.097892, 33.853662],
          zoom: 4.056,
          token: "062ab1e31804a3859a9da04372d183dc",
        }),
      });
      scene.on("loaded", () => {
        fetch(
          "https://gw.alipayobjects.com/os/basement_prod/7359a5e9-3c5e-453f-b207-bc892fb23b84.csv"
        )
          .then((res) => res.text())
          .then((data) => {
            // console.log("data---", data);
            const layer = new HeatmapLayer({})
              .source(data, {
                parser: {
                  type: "csv",
                  x: "lng",
                  y: "lat",
                },
                transforms: [
                  {
                    type: "grid",
                    size: 20000,
                    field: "v",
                    method: "sum",
                  },
                ],
              })
              .shape("heaxgon")
              .style({
                coverage: 0.9,
                angle: 0,
              })
              .animate({
                leave: {
                  animation: "fade-out",
                },
              })
              .color(
                "count",
                [
                  "#8C1EB2",
                  "#8C1EB2",
                  "#DA05AA",
                  "#F0051A",
                  "#FF2A3C",
                  "#FF4818",
                  "#FF4818",
                  "#FF8B18",
                  "#F77B00",
                  "#ED9909",
                  "#ECC357",
                  "#EDE59C",
                ].reverse()
              );
            scene.addLayer(layer);
          });
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 60vh;
  position: relative;
}
</style>