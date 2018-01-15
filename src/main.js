// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Vuex from 'vuex'

import App from './App'
import router from './router'
import Axios from 'axios'


import './css/style.scss'

Vue.prototype.$axios = Axios;

// UI组件  引入全局   并设置全局组件大小
Vue.use(ElementUI, { size: 'small' })
Vue.use(Vuex)



new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// Vue.config.productionTip = false、
