import Vue from 'vue'
import App from './App'

// import uniRequest from 'uni-request';
import uniRequest from  './utils/uniRequest.js';
import api from  './utils/api.js';

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$uniRequest  = uniRequest 
Vue.prototype.$api  = api 

const app = new Vue({
    ...App
})
app.$mount()
