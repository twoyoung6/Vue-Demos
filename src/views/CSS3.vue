
<template>
  <div class="css3">
    <van-divider class="van-divider"> :empty::before 伪类 </van-divider>
    <div class="title"></div>

    <van-divider class="van-divider"> :has 伪类 </van-divider>
    <form class="form">
      <div class="item">
        <label>用户名</label>
        <input required />
      </div>
      <div class="item">
        <label>备注</label>
        <input />
      </div>
    </form>
    <div class="content">
      <div class="item">列1表<van-icon name="coupon-o" class="thumb" /></div>
      <div class="item">列2表<van-icon name="coupon-o" class="thumb" /></div>
      <div class="item">列3表<van-icon name="coupon-o" class="thumb" /></div>
    </div>

    <van-divider class="van-divider"> --attribute 自定义属性 </van-divider>
    <div class="attribute">
      <div class="attribute-section">
        除了 Edge 外主流浏览器的最新版都已经支持这个特性了，而 Edge
        也将支持这个属性。
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
// .css3 {
// 组件局部可以重写覆盖 :root 全局自定义样式
//   --bg-color: #043211;
// }
.van-divider {
  color: #0fb3ff;
  border-color: #0fb3ff;
  padding: 0 16px;
  margin: var(--padding-main) 0 6px 0;
}
.title {
  width: 70%;
  height: 100px;
  background: var(--theme-color);
  font-size: 30px;
  font-weight: 600;
  color: var(--font-color);
  margin: 0 auto;
  // grid 上下左右居中对齐
  display: grid;
  place-items: center;
  &:empty::before {
    content: "暂无数据 :empty::before 伪类";
    color: var(--font-color);
    font-weight: normal;
  }
}
.form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .item {
    padding: 10px 0;
    input {
      border: 1px solid var(--theme-color);
      border-radius: 10px;
      height: 60px;
      line-height: 60px;
      padding-left: 10px;
      margin-left: 10px;
    }
    // 选中包含 input且为 required 的 item元素
    &:has(> input:required)::before {
      content: "*";
      color: var(--bg-color);
    }
  }
}
.content {
  .item {
    position: relative;
    padding: 10px 20px;
    background-color: var(--font-color);
    border: 1px solid #fbb360;
    margin: 10px;
    border-radius: 8px;
    .thumb {
      position: absolute;
      height: 30px;
      right: 5px;
      top: 0;
      bottom: 0;
      margin: auto;
      cursor: move;
      opacity: 0;
      color: #fbb360;
    }
    &:hover .thumb {
      opacity: 1;
    }
    &:has(.thumb:hover) {
      -webkit-user-drag: element;
    }
  }
}
.attribute {
  padding: var(--padding-main);
  .attribute-section {
    padding: var(--padding-main);
    color: var(--font-color);
    font-size: calc(var(--base-size) * var(--font-size));
    background: var(--bg-color, #3577fe);
  }
}
</style>
