import Vue from 'vue'
import Vant from 'vant'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import '@/assets/css/index.scss'
require('lib-flexible')
Vue.config.productionTip = false
import PdfView from "w-pdf-preview";
Vue.use(PdfView)

Vue.use(Vant)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
