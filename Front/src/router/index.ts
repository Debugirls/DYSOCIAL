import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import haveRoleGuard from './auth-guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  //{
    //path: '/user',
    //name: 'user',
    //component: () => import('../views/UserProfileView.vue')
  //},
  {
    path: '/homeuser',
    name: 'homeUser',
    beforeEnter: [haveRoleGuard],
    component: () => import('../views/HomeUserView.vue')
  },
  {
    path: '/newpublication',
    name: 'newPublication',
    beforeEnter: [haveRoleGuard],
    component: () => import('../views/NewPublicationView.vue')
  },
  {
    path: '/notfound',
    name: 'notFound',
    component: () => import('../views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory("/"),
  routes: routes
})

export default router
