<template>
    <nav class="main-nav">
      <router-link to="/about">ABOUT</router-link>
      <router-link to="/artworks">ARTWORKS</router-link>
      <router-link to="/shop">SHOP</router-link>
      <router-link to="/contact">CONTACT</router-link>
    </nav>
  </template>
  
  <style scoped>
  .main-nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: white;
    padding: 1rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    z-index: 1000;
  }
  
  .router-link-active {
    font-weight: bold;
    border-bottom: 2px solid #000;
  }
  </style>