import Vue from 'vue'
import store from './store'
import {
	router,
	RouterMount
} from './router.js'
Vue.use(router)

import App from './App' 

import formatDate from 'assets/js/date.js'
import formatRichText from 'assets/js/image.js'
import formatNum from 'assets/js/number.js'

// Vue.prototype.$httpPath="http://192.168.0.121:8800";
// Vue.prototype.$httpPath="http://192.168.0.122:9090";
Vue.prototype.$httpPath="http://192.168.0.219:8720/jdnet_cus";
// Vue.prototype.$httpPath="http://192.168.0.146:8580";
// Vue.prototype.$httpPath = "http://192.168.0.118:7020/jdnet_cus";
Vue.prototype.$httpPathExt = "http://192.168.0.219:8720/jdnet_cus/action/router";
Vue.prototype.$httpPath_jdmall="/jdmall";

Vue.filter('formatDate', formatDate.formatDate); // 格式化时间
Vue.filter('formatRichText', formatRichText.formatRichText); // 格式化图片大小
Vue.filter('formatNum', formatNum.formatNum); // 格式化数字

// 加载页面
import requestLoading from './pages/common/requestLoading.vue';
//组件挂载到全局，方便每个页面使用
Vue.component('request-loading', requestLoading);
//挂载全局显示/隐藏请求加载动画
function showLoading(){
	store.commit('request_show_loading');
}
function hideLoading(){
	store.commit('request_hide_loading');
}
Vue.prototype.$showLoading = showLoading; //全局显示动画可以 this.$showLoading();
Vue.prototype.$hideLoading = hideLoading; //全局隐藏动画可以 this.$hideLoading();

/* 引入公共js*/
import jdGlo from '@/assets/js/jdGlo.js'
Vue.prototype.$jdGlo = jdGlo;

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

// #ifdef H5
RouterMount(app, router, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
