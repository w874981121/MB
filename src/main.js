// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import App from './App'
import {router} from './router/index'    //路由
import Axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
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
let loadingInstance = null;

Axios.defaults.timeout = 5000
//添加一个请求拦截器
Axios.interceptors.request.use(function (config) {
  //在请求发出之前进行一些操作

  let re = new RegExp("/api", "g"),
      srt  = config.url.replace(re, "http://47.104.146.162:8080");
      config.url = srt

  loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0)'
  });
  return config;
}, function (err) {
  //请求错误
  // console.log("请求错误")
  loadingInstance.close();
  return Promise.reject(error);
});
//添加一个响应拦截器
Axios.interceptors.response.use(function (res) {
  //在这里对返回的数据进行处理
  loadingInstance.close();
  // console.log("请求返回")
  if (res.status == 401) {
    router.push({path: "/"})
  }
  return res;
}, function (err) {
  //返回错误
  loadingInstance.close();
  console.log("返回错误")
  if (err.response.status == 401) {
    Message.error('登陆超时')
    router.push({path: "/"})
  }
  return Promise.reject(error);
})


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
