<template>
  <ul ref="demo" class="demo">
    <li>150****1234 邀请5人提现500元</li>
    <li>147****1234 邀请4人提现200元</li>
    <li>137****1234 邀请7人提现100元</li>
    <li>177****1234 邀请4人提现100元</li>
    <li>180****1234 邀请21人提现100元</li>
    <li>180****1234 邀请12人提现1000元</li>
    <li>180****1234 邀请13人提现1000元</li>
    <li>180****1234 邀请2人提现100元</li>
    <li>180****1234 邀请9人提现100元</li>
    <li>180****1234 邀请6人提现100元</li>
    <li>180****1234 邀请5人提现100元</li>
    <li>180****1234 邀请8人提现100元</li>
    <li>180****1234 邀请1人提现100元</li>
    <li>180****1234 邀请9人提现100元</li>
    <li>180****1234 邀请11人提现1000元</li>
    <li>139****1234 邀请10人提现900元</li>
    <li>170****1234 邀请16人提现1500元</li>
    <li>150****1234 邀请9人提现700元</li>
    <li>130****1234 邀请4人提现400元</li>
  </ul>
</template>

<script>
export default {
  name: "ScrollList",
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.customScroll();
  },
  methods: {
    customScroll(delay = 100) {
      if (!this.$refs.demo) {
        throw new Error("选择器不存在");
      }

      let timer = null;

      let _elem = this.$refs.demo;
      if (timer) {
        clearInterval(timer);
      }
      _elem.onmouseover = function () {
        clearInterval(timer);
      };
      _elem.onmouseout = function () {
        c();
      };

      var c = () => {
        if (_elem.scrollHeight >= _elem.offsetHeight) {
          timer = setInterval(() => {
            if (_elem.scrollTop >= _elem.scrollHeight) {
              _elem.scrollTop = 0;
            } else {
              if (_elem.scrollTop >= _elem.children[0].offsetHeight) {
                _elem.append(_elem.children[0]);
              }
              _elem.scrollTop++;
            }
          }, delay);
        }
      };
      c();
    },
  },
};
</script>
<style lang="scss" scoped>
.demo {
  list-style: none;
  height: 300px;
  overflow: hidden;
  background: #db3737;
  color: #fff;
  padding: 0;
  li {
    font-size: 32px;
    line-height: 60px;
  }
}
</style>
