import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    meta: { showHeader: true },
    component: () => import('../views/Main.vue')
  },
  { path: '/artworks', component: () => import('../views/Artworks.vue') },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})