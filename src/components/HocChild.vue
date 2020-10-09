<template>
  <div class="lineb">
    <p>—————<van-icon name="good-job" />B子组件—————</p>
    <p>foo：{{ $attrs.foo }}</p>
    <p>coo：{{ $attrs.coo }}</p>
    <hoc-child-child v-bind="$attrs" v-on="$listeners"></hoc-child-child>
  </div>
</template>
<script>
import HocChildChild from "components/HocChildChild";
export default {
  name: "HocChild",
  components: { HocChildChild },
  props: {},
};
</script>
