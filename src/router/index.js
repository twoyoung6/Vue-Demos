import Vue from 'vue'
import VueRouter from 'vue-router'
const ScrollList = () => import(/* webpackChunkName: "home" */ /* webpackPrefetch: true */'views/ScrollList.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ScrollList,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/scroll-list',
    name: 'ScrollList',
    component: ScrollList,
    meta: {
      title: '滚动新闻列表'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
