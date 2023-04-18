<template>
  <div class="selectpage">
    <v-selectpage
      :data="list"
      key-field="id"
      show-field="desc"
      :tb-columns="columns"
      :pagination="false"
      v-model="value"
    />
  </div>
</template>

<script>
import { SelectPage } from "v-selectpage";
export default {
  components: {
    "v-selectpage": SelectPage,
  },
  data() {
    return {
      value: "",
      list: [],
      columns: [
        { title: "英文名", data: "name" },
        { title: "中文名", data: "desc" },
      ],
    };
  },
  created() {
    for (let index = 0; index < 5000; index++) {
      this.list.push({
        id: index,
        name: `Cleveland Cavaliers_${index}`,
        desc: `克里夫兰骑士_${index}`,
      });
    }
  },
};
</script>

<style>
.selectpage {
  min-height: 100vh;
}
</style>