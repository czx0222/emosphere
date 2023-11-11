
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import router from './router';
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
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