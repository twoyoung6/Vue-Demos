import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
const originalPush = VueRouter.prototype.push

//解决报错信息：NavigationDuplicated: Avoided redundant navigation to current location
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
requireComponent.keys().forEach((element) => {
  let comp = element.split('/')
  let component = () =>
    import(
        /* webpackChunkName: "home" */ /* webpackPrefetch: true */ `views/${comp[1]}`
    )
  let compName = comp[1].split('.')[0]
  let isIfame = compName.includes('iFrame') ? component : false
  let route = isIfame ? {
    path: `/${compName.toLowerCase()}`,
    name: compName,
    iframeComponent: isIfame,
  } : {
    path: `/${compName.toLowerCase()}`,
    name: compName,
    component: component
  }

  routes.push(route)
})
console.log(`🍉 ~ requireComponent.keys ~ routes`, routes)


Vue.use(VueRouter)

routes.unshift({
  path: '/',
  meta: {
    title: '首页',
  },
})

const router = new VueRouter({
  routes,
})

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach((to) => {
  NProgress.done();
});

export default router
