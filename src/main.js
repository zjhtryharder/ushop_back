// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import store from './store/index'
import './utils/Element'
import './utils/http'
/* eslint-disable no-new */

//图片路径全局基础地址
Vue.prototype.$imgBaseUrl = 'http://localhost:3000'
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
