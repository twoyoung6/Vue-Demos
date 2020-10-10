<template>
  <div class="lineb">
    <p>—————<van-icon name="good-job" />B中间组件—————</p>
    <p>papi：{{ $attrs.papi }}</p>
    <p>jojo：{{ $attrs.jojo }}</p>
    <hoc-child-child v-bind="$attrs" v-on="$listeners"></hoc-child-child>
  </div>
</template>
<script>
import HocChildChild from "components/HocChildChild";
export default {
  name: "HocChild",
  components: { HocChildChild },
  inheritAttrs: false,
  props: {},
};
</script>
