// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import { router } from './router/index'    //路由
import Axios from 'axios'
// import qs from 'qs'
// import VueAxios from 'vue-axios'
import store from './vuex/index'   // vuex 状态
import util from './util'         // 公用方法
import './css/style.scss'

import VueQuillEditor from 'vue-quill-editor';

import 'quill/dist/quill.snow.css'



// UI组件  引入全局   并设置全局组件大小
Vue.use(ElementUI, {size: 'small'})

Vue.use(VueQuillEditor)

//自定义方法
Vue.use(util);

//ajax 配置
Vue.prototype.$axios = Axios;


// Vue.use(VueAxios, Axios)


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

Vue.config.productionTip = false
