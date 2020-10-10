<template>
  <div class="linec">
    <p>—<van-icon name="shop" />C孙子隔代组件—</p>
    <p>jojo:{{ jojo }}</p>
    <van-search
      v-model="val"
      autofocus
      show-action
      shape="round"
      left-icon="scan"
      placeholder="Enter something..."
      @input="onChange"
    />
  </div>
</template>
<script>
export default {
  name: "childDomChild",
  props: {
    jojo: {
      type: String,
      default: "",
    },
  },
  inheritAttrs: false,
  data() {
    return {
      val: "",
    };
  },
  methods: {
    onChange() {
      this.$emit("inputChange", this.val);
    },
  },
};
</script>
