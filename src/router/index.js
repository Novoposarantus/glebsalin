import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Main.vue') },
  //{ path: '/about', component: () => import('../views/About.vue') },
  { path: '/artworks', component: () => import('../views/Artworks.vue') },
  //{ path: '/shop', component: () => import('../views/Shop.vue') },
  //{ path: '/contact', component: () => import('../views/Contact.vue') }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})