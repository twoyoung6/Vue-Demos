import Vue from 'vue'
import Vant from 'vant'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import '@/assets/css/index.scss'
require('lib-flexible')
Vue.config.productionTip = false
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

Vue.use(Vant)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
