import Vue from 'vue'
import App from './App'


import JSEncrypt from '@/static/js/jsencrypt.js'
Vue.prototype.$jsencrypt = JSEncrypt


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount() 
