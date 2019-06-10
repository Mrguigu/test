// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

//使用轮播图插件
import VueAwesomSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomSwiper); //使其全局
import 'swiper/dist/css/swiper.css';

//图片懒加载插件
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://img.16pic.com/00/64/53/16pic_6453017_s.png',
  loading: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
  attempt: 1
});

//引入vuex的store
import store from "./store/index.js";

//进入路由之前，每次都会执行该函数，全局钩子，具有拦截功能
router.beforeEach((to,from,next)=>{
  document.title=to.meta.title;
  if(to.path=="/list"){
      //next({path:"/add"});  //拦截功能的体现
      next();
  }else
      next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template:"<App/>"
})
