# vue-demos

vue 技术栈的 演示的一些 DEMO 超集。首页菜单导航及路由注册会根据 views 文件夹下创建的 .vue 文件来自动生成。

## 项目结构

```
│  .gitignore
│  .postcssrc.js
│  babel.config.js
│  package-lock.json
│  package.json
│  README.md
│  tree.txt
│  vue.config.js
├─public
├─components // 子组件文件夹
├─components
    │  DestinationMap.vue // H5唤起第三方地图导航组件
└─src
    │  App.vue
    │  main.js
    │
    ├─assets
    │  └─css
    │
    ├─router
    │
    └─views
      └─ ScrollList.vue // 中奖连续滚动列表
      └─ KeyBoard.vue // 软键盘
      └─ HocParent.vue // 演示 $attrs、$listeners 传参
      └─ Maps.vue // 唤起第三方地图导航
```

## 路由示例

- http://localhost:8080/#/scrolllist
- http://localhost:8080/#/keyboards

路由 hash 就是 views 下的文件名小写
