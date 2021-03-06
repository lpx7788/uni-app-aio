import Vue from 'vue'
import App from './App'
import uniRequest from  './utils/http.js';
import api from  './utils/api.js';
import theme from  './utils/theme.js';

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$uniRequest  = uniRequest 
Vue.prototype.$api  = api 
Vue.prototype.$theme  = theme 

const app = new Vue({
    ...App
})

app.$mount()
