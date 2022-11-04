import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Aheshiyu from '../views/Aheshiyu.vue'
import Mikyan from '../views/Mikyan.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/aheshiyu',
    name: 'Aheshiyu',
    component: Aheshiyu
  },
  {
    path: '/mikyan',
    name: 'Mikyan',
    component: Mikyan
  },
]

const router = new VueRouter({
  routes
})

export default router
