// 禁止调试的脚本，值支持PC端，不太好用
import DisableDevtool from 'disable-devtool';
const options = {
  md5: '', // 绕过禁用的md5值，详情见3.2，默认不启用绕过禁用
  url: '', // 关闭页面失败时的跳转页面，默认值为localhost
  tkName: 'ddtk', // 绕过禁用时的url参数名称，默认为 ddtk
  interval: 600, // 定时器的时间间隔 默认200ms
  disableMenu: true, // 是否禁用右键菜单 默认为true
  stopIntervalTime: 200, // 在移动端时取消监视的等待时长
  clearIntervalWhenDevOpenTrigger: false, // 是否在触发之后停止监控 默认为false， 在使用ondevtoolclose时该参数无效
  detectors: [1, 2, 3], // Array < DetectorType >, // 启用的检测器 检测器详情见 3.5 默认为全部，建议使用全部
  clearLog: true, // 是否每次都清除log
  disableSelect: true, // 是否禁用选择文本 默认为false
  disableCopy: true, // 是否禁用复制 默认为false
  disableCut: false, // 是否禁用剪切 默认为false
  disablePaste: false, // 是否禁用粘贴 默认为false
  ignore: '', // (string | RegExp)[] | null | (() => boolean), // 某些情况忽略禁用
  disableIframeParents: true, // iframe中是否禁用所有父窗口
  timeOutUrl: '',// 关闭页面超时跳转的url,
  ondevtoolopen: (type, next) => {
    debugger
  }, // 开发者面板打开的回调，启用时url参数无效，type 为监测模式，详见3.5， next函数是关闭当前窗口
  ondevtoolclose: () => { }, // 开发者面板关闭的回调
}
DisableDevtool(options);
