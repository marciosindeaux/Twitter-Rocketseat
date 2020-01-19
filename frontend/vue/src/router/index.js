import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: () => import('../views/Timeline/Timeline.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
