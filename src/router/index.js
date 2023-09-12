import { createRouter, createWebHistory } from 'vue-router'
import GuitarsListView from '../views/GuitarsListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'guitarsList',
      component: GuitarsListView
    },
    //csak akkor tölti be, ha rákattintanak
    {
      patch: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    }
  ]
})

export default router
