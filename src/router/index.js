import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login'
import Layout from '../views/layout'
import Home from '../views/home'
import Qa from '../views/qa'
import Video from '../views/video'
import My from '../views/my'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: Home
      },
      {
        path: '/qa',
        name: 'qa',
        component: Qa
      },
      {
        path: '/video', // 默认子路由
        name: 'video',
        component: Video
      },
      {
        path: '/my', // 默认子路由
        name: 'my',
        component: My
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
