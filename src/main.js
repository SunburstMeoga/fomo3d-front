// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Web3 from 'web3'
import { config } from './const/config'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/tailwind.css'
import '@/assets/css/iconfont.css'
import 'vant/lib/index.css'
import Vant from 'vant'

import i18n from './local'


Vue.use(ElementUI)
Vue.Use(Vant)

Vue.prototype.Web3 = new Web3(window.ethereum)
Vue.prototype.Config = config


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
