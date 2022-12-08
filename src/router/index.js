import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Additional from '../views/Additional.vue'
import Setting from '../views/Setting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/additional',
    name: 'Additional',
    component: Additional,
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  }
]

const router = new VueRouter({
  routes
})

export default router
