import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'gamingCareerList',
      component: () => import('@/views/GamingCareerList/index.vue')
    }
  ]
})

export default router
