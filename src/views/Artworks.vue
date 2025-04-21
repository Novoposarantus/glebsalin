<template>
    <div class="art-grid">
      <img 
        v-for="(img, index) in artworkImages" 
        :key="index"
        :src="`/img/artwork-${index + 1}.jpg`" 
        alt="Artwork"
        class="art-image"
      />
    </div>
  </template>
  
  <script setup>
  const artworkImages = new Array(12) // Количество работ
  </script>
  
  <style>
  .art-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 6rem 2rem 2rem;
  }
  
  .art-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  .art-image:hover {
    transform: scale(1.03);
  }
  </style>