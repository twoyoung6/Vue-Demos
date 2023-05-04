<template>
  <div>
    <div v-html="html" id="inner"></div>
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
      html: `<code class="hljs language-js copyable" lang="js">container.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">'scroll'</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> scrollTop = container.<span class="hljs-property">scrollTop</span>;

  <span class="hljs-comment">// 上边空白的高度</span>
  <span class="hljs-keyword">const</span> topHeight = scrollTop;
  <span class="hljs-keyword">const</span> startIndex = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(topHeight / <span class="hljs-number">40</span>) - <span class="hljs-number">2</span>, <span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> endIndex = startIndex + <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(<span class="hljs-number">500</span> / <span class="hljs-number">40</span>);

  <span class="hljs-keyword">const</span> show = data.<span class="hljs-title function_">slice</span>(startIndex, endIndex + <span class="hljs-number">1</span>);

  <span class="hljs-comment">// 计算下边剩余的隐藏区域高度</span>
  <span class="hljs-keyword">const</span> dataHeight = data.<span class="hljs-property">length</span> * <span class="hljs-number">40</span>;
  <span class="hljs-keyword">const</span> bottomHeight = dataHeight - <span class="hljs-number">500</span> - scrollTop;

  <span class="hljs-keyword">const</span> topDom = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">'div'</span>);
  <span class="hljs-keyword">const</span> bottomDom = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">'div'</span>);
  topDom.<span class="hljs-property">style</span>.<span class="hljs-property">height</span> = topHeight + <span class="hljs-string">'px'</span>;
  bottomDom.<span class="hljs-property">style</span>.<span class="hljs-property">height</span> = bottomHeight + <span class="hljs-string">'px'</span>;

  <span class="hljs-comment">// 还没到底</span>
  <span class="hljs-keyword">if</span> (bottomHeight &gt; -<span class="hljs-number">100</span>) {
    <span class="hljs-comment">// 清空</span>
    container.<span class="hljs-property">innerHTML</span> = <span class="hljs-string">''</span>;
    container.<span class="hljs-title function_">appendChild</span>(topDom);
    <span class="hljs-title function_">addList</span>(show, container);
    container.<span class="hljs-title function_">appendChild</span>(bottomDom);
  }
});
<span class="copy-code-btn">复制代码</span></code>`,
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
  mounted() {
    console.log("dom---", document.querySelector("#inner").innerHTML);
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