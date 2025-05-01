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
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Если есть сохраненная позиция (при навигации назад/вперед), используем ее
    if (savedPosition) {
      return savedPosition
    } else {
      // Иначе (при новой навигации) скроллим плавно к верху страницы
      return { top: 0, left: 0, behavior: 'smooth' }
    }
  }
})