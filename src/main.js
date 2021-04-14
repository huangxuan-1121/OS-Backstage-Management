// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import axios from 'axios'
import Qs from 'qs'
Vue.use(ElementUI)
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;
// Vue.use(VueAxios,axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App),//elementUI设置
  template: '<App/>'
});
