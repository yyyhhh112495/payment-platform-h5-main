import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PayHome',
    component: () => import(/* webpackChunkName: "PayHome" */ '../views/PayHome.vue')
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import(/* webpackChunkName: "Success" */ '../views/Success.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/payment-platform/',
  routes
})

export default router
