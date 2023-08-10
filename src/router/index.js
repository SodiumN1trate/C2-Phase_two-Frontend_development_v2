import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../views/BookingView.vue')
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('../views/TicketView.vue')
    },
    {
      path: '/retrieve',
      name: 'retrieve',
      component: () => import('../views/TicketRetrieve.vue')
    }
  ]
})

export default router
