<template>
  <div>
    <Keyboard
      :options="keyboardOption"
      class="ui-keyboard-case"
      v-model="pym"
    ></Keyboard>
    <label for="value">展示输入值</label>：
    <span id="value">{{ pym }}</span>
  </div>
</template>

<script>
import { Keyboard } from "vue-virtual-keyboard";
export default {
  components: { Keyboard },
  name: "Keyboards",
  data() {
    return {
      pym: "",
      keyboardOption: {
        usePreview: false,
        stickyShift: false,
        autoAccept: false,
        language: "zh",
        display: {
          // overwrite key display
          accept: "确认",
          bksp: "删除",
          cancel: "取消",
          enter: "回车",
        },
      },
    };
  },
};
</script>

<style lang="scss">
.ui-keyboard {
  font-size: 20px;
}
.ui-keyboard-case {
  font-size: 40px;
  text-align: center;
  background: #fefefe;
  border: 1px solid #ffe3e2;
  padding: 4px;
  width: 38%;
  height: auto;
  margin-right: 5%;
  /* left: 25%; */
  /* top: auto;
    bottom: 0px; */
  /* position: fixed; */
}
</style>