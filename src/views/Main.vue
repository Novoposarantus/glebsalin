<template>
  <div class="main-content">
    <img 
      :src="getImageUrl(`eye_main.png`)"
      alt="Eye illustration" 
      class="eye-image"
    />
  </div>
  <SarcophagusAnimation/>
  <div class="bottom"></div>
</template>
  
<script setup>
import SarcophagusAnimation from '../components/SarcophagusAnimation.vue'
const getImageUrl = (path) => {
  return import.meta.env.BASE_URL + 'img/' + path;
}
</script>
  
<style scoped>
  .eye-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    height: auto;
  }

  .to-be-continued {
    font-family: 'GlebSalinFont', sans-serif;
    color: #000; /* Цвет ссылок */
    font-size: 4rem;
    letter-spacing: 0.5rem;
    margin: 1rem 0;
    text-align: center;
  }

  .bottom {
    height: 20px;
  }

  @media (max-width: 500px) { 
    .eye-image {
        height: 40px;
    }
  }
</style>