import Vue from 'vue'
import VueRouter from 'vue-router'

// 批量获取组件注册
const requireComponent = require.context(
  // 其组件目录的相对路径
  '../views',
  // 是否查询其子目录
  false,
  // 匹配vue后缀文件名的文件
  /\.vue$/
)
let routes = []
requireComponent.keys().forEach(element => {
  let comp = element.split('/')
  let compName = comp[1].split('.')[0]
  // console.log(comp, compName)
  let route = {
    path: `/${compName.toLowerCase()}`,
    name: compName,
    component: () => import(/* webpackChunkName: "home" */ /* webpackPrefetch: true */`views/${comp[1]}`),
  }
  routes.push(route)
});

Vue.use(VueRouter)

routes.unshift({
  path: '/',
  component: () => import(/* webpackChunkName: "home" */ /* webpackPrefetch: true */'../views/ScrollList.vue'),
  meta: {
    title: '首页'
  }
})

console.log(routes)
const router = new VueRouter({
  routes
})

export default router
