import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const repoName = 'glebsalin'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  base: process.env.NODE_ENV === 'production' 
    ? `/${repoName}/` 
    : '/',
  server: {
    port: 8080
  },
  define: {
    '__BASE_URL__': JSON.stringify(
      process.env.NODE_ENV === 'production' 
        ? `/${repoName}` 
        : '/'
    )
  }
})