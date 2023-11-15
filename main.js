// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import router from './router';
import store from './stores';
//Vue.use(uView) 
import './uni.promisify.adaptor'
Vue.config.productionTip = false

App.mpType = 'app'
//app.provide('store', store);
const app = new Vue({
	store,
	router,
    ...App
})
app.$mount()

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from 'vue-router';
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif



