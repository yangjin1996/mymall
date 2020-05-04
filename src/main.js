import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueLazyload from "vue-lazyload"
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Loading from "./plugin/loading"
import Modal from "./plugin/modal"

axios.defaults.baseURL = 'http://www.2yue.cc/index.php';
axios.defaults.timeout = 8000;
axios.defaults.headers.appkey = 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM';
Vue.use(VueAxios,axios);
//图片懒加载
Vue.use(VueLazyload,{
  loading:'/images/loading-svg/loading-bubbles.svg'
})
Vue.use(Loading)
Vue.use(Modal)
Vue.config.productionTip = false;
/*对请求的数据进行处理，use里有两个参数，分别是成功和失败时执行的函数，
 axios网址：https://www.npmjs.com/package/axios */
axios.interceptors.response.use(function (response) {
  const res = response.data
  if(res.error_code === 0){
    return res.data || ''
  }else{
    return Promise.reject(new Error(res.error_msg || '获取失败'));
  }
}, function (error) {
  console.log(error);
  return Promise.reject(error)
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
