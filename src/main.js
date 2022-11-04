import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import gasApi from './api' // 追加

Vue.config.productionTip = false
Vue.prototype.$axios = gasApi // 追加

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
