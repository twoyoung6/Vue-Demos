export function client() {
  const browser = navigator.userAgent.toLowerCase();
  let EV = ''
  if (browser.match(/Alipay/i) == "alipay") {
    console.log("支付宝app的浏览器");
    EV = 'alipay'

  } else if (browser.match(/MicroMessenger/i) == "micromessenger") {
    console.log("微信app的浏览器");
    EV = 'wechat'
  } else {
    EV = 'other'
    console.log("非支付宝及微信浏览器环境");
  }
  return EV
}