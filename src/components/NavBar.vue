<template>
    <nav class="main-nav">
      <router-link to="/">ABOUT</router-link>
      <router-link to="/artworks">ARTWORKS</router-link>
      <router-link to="/shop">SHOP</router-link>
      <router-link to="/contact">CONTACT</router-link>
    </nav>
  </template>
  
  <style scoped>
  
  .router-link-active {
    font-weight: bold;
    border-bottom: 2px solid #000;
  }
  </style>