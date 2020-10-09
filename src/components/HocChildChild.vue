<template>
  <div class="linec">
    <p>—<Icon type="logo-octocat" />C孙子隔代组件—</p>
    <p>coo:{{ coo }}</p>
    <Input
      search
      enter-button
      size="small"
      prefix="ios-contact"
      placeholder="Enter something..."
      @on-change="onChange"
    />
  </div>
</template>
<script>
export default {
  name: "childDomChild",
  props: {
    coo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inheritAttrs: false,
    };
  },
  methods: {
    onChange() {
      this.$emit("inputChange");
    },
  },
};
</script>
