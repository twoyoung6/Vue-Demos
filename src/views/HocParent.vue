<template>
  <div class="linea">
    <div class="docs">
      <p><b>隔代组件通信</b></p>
      <p>
        1）<strong>$attrs：</strong>包含了父作用域中不被 prop 所识别 (且获取)
        的特性绑定 ( class 和 style 除外 )。当一个组件没有声明任何 prop
        时，这里会包含所有父作用域的绑定 ( class 和 style 除外 )，并且可以通过
        v-bind="$attrs" 传入内部组件。通常配合 inheritAttrs 选项一起使用。
      </p>
      <p>
        2）<strong>$listeners：</strong>包含了父作用域中的 (不含 .native
        修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件；
      </p>
      <p>
        3）<strong>inheritAttrs：</strong>默认值true,继承所有的父组件属性（除props的特定绑定）作为普通的HTML特性应用在子组件的根元素上，如果你不希望组件的根元素继承特性设置inheritAttrs:
        false,但是class属性会继承。
      </p>
    </div>
    <p>———————<van-icon name="live" />A根组件———————</p>
    <p>papi：{{ papi }}</p>
    <p>jojo：{{ jojo }}</p>
    <hoc-child :papi="papi" :jojo="jojo" v-on:inputChange="receiveChange">
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
      papi: "Hello，world.",
      jojo: "Hello，twoyoung!",
    };
  },
  mounted() {
    // 重写复制内容存入系统粘贴板
    var wrap = document.querySelector(".docs");
    wrap.oncopy = function (event) {
      // 通过copy事件监听，阻止将选中内容复制到系统剪切板上
      event.preventDefault();
      // 获取选中内容对象
      const selection = document.getSelection();
      // selection对象重构了toSring()方法，获取selection对象的选中内容
      var selectContent = selection.toString();
      var dealContent =
        selectContent + "\n\n转载请联系作者，内容地址：www.twoyoung.top";
      // 把重写后的内容写入到剪贴板
      event.clipboardData.setData("text/plain", dealContent);
    };
  },
  methods: {
    // 接收隔代组件（孙子组件）的事件传递
    receiveChange(val) {
      this.jojo = val ? val : "Hello，twoyoung!";
      console.log("receiveChange---", this.jojo, this.papi, val);
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
    letter-spacing: 2px;
    font-size: 28px;
  }
  strong {
    color: #56d13d;
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