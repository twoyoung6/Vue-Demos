import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/index.scss'
require('lib-flexible')
Vue.config.productionTip = false
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
