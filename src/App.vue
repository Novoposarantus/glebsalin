<template>
  <Header />
  <NavBar />
  <router-view />
</template>

<script setup>
import { computed, onMounted, nextTick } from 'vue';

import NavBar from './components/NavBar.vue'
import Header from './components/Header.vue'

onMounted(async () => {
  const loader = document.getElementById('app-loader');
  if (loader) {
    const minDisplayTimeMs = 1000;
    const fadeOutDurationMs = 500; // Длительность fade-out анимации из CSS (0.5s = 500ms) - настрой!

    await nextTick();
    setTimeout(async () => {
      loader.classList.add('hidden');
      await nextTick();
      setTimeout(() => {
          loader.remove();
      }, fadeOutDurationMs);
    }, minDisplayTimeMs)
  }
});
</script>

<style>

</style>