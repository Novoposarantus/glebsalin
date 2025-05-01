import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    meta: { showHeader: true },
    component: () => import('../views/Main.vue')
  },
  { 
    path: '/artworks',
    component: () => import('../views/Artworks.vue')
  },
  { 
    path: '/shop',
    component: () => import('../views/Shop.vue')
  },
  { 
    path: '/Contact',
    component: () => import('../views/Contact.vue')
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})