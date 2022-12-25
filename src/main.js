import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import gasApi from './api' // 追加
import utility from './utility'

Vue.config.productionTip = false
Vue.prototype.$gas = gasApi // 追加
Vue.mixin(utility)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
