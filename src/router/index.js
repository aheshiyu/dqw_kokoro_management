import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function loadView (view) {
  return () => import(`@/views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView('Home'),
  },
  {
    path: '/additional',
    name: 'Additional',
    component: loadView('Additional'),
  },
  {
    path: '/setting',
    name: 'Setting',
    component: loadView('Setting')
  }
]

const router = new VueRouter({
  routes
})

export default router
