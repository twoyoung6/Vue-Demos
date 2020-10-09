<template>
  <div class="linea">
    <div class="docs">
      <p>$attrs/$listeners 适用于 隔代组件通信</p>
      <p>
        1）$attrs：包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 ( class
        和 style 除外 )。当一个组件没有声明任何 prop
        时，这里会包含所有父作用域的绑定 ( class 和 style 除外 )，并且可以通过
        v-bind="$attrs" 传入内部组件。通常配合 inheritAttrs 选项一起使用。
      </p>
      <p>
        2）$listeners：包含了父作用域中的 (不含 .native 修饰器的) v-on
        事件监听器。它可以通过 v-on="$listeners" 传入内部组件。
      </p>
    </div>
    <p>———————<Icon type="logo-android" />A父组件———————</p>
    <hoc-child :foo="foo" :coo="coo" v-on:inputChange="receiveChange">
    </hoc-child>
  </div>
</template>

<script>
import HocChild from "components/HocChild";
export default {
  name: "HocParent",
  components: { HocChild },
  data() {
    return {
      foo: "Hello, world",
      coo: "Hello,rui",
    };
  },
  methods: {
    // 接收隔代组件（孙子组件）的事件传递
    receiveChange() {
      console.log("receiveChange---", this.coo, this.foo);
    },
  },
};
</script>

<style lang="scss">
.docs {
  p {
    text-align: left;
    padding: 0;
    color: rgb(87, 85, 85);
  }
}
.linea {
  border: 1px dashed #56d13d;
  margin: 20px 40px;
  padding: 20px;
}
.lineb {
  border: 1px solid #f76c2c;
  margin: 20px 40px;
  padding: 20px;
}
.linec {
  border: 1px dashed #6b6dfa;
  margin: 20px 40px;
  padding: 20px;
}
</style>