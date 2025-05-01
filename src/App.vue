<template :style="appStyle">
  <Header />
  <NavBar />
  <router-view />
</template>

<script setup>
import {computed} from 'vue';

import NavBar from './components/NavBar.vue'
import Header from './components/Header.vue'

const appStyle = computed(() => ({
  backgroundImage: `url('${import.meta.env.BASE_URL}img/background.jpg')`
}))
</script>

<style scoped>

</style>