# vue-demos

vue 技术栈的 演示的一些 DEMO 超集。

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
      └─ Maps.vue // 唤起第三方地图导航
```

## 路由示例

- http://localhost:8080/#/scrolllist
- http://localhost:8080/#/keyboards

路由 hash 就是 views 下的文件名小写
