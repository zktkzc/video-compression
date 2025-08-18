import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/:any(.*)*',
      component: () => import('@renderer/views/Home.vue')
    },
    {
      name: 'setting',
      path: '/setting',
      component: () => import('@renderer/views/Setting.vue')
    }
  ]
})

export default router
