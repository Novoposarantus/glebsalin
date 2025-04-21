<template>
    <div class="wrapper" v-if="showHeader">
        <div class="title-wrapper">
            <img
                :src="getImageUrl(`title.svg`)"
                alt="Title"
                class="svg-image"
            />
        </div>
        <div class="info-container">
            <div class="photo-container">
                <img
                    :src="getImageUrl(`header_photo.jpg`)" 
                    alt="photo"
                    class="header-photo"
                />
            </div>
            <div class="info-text-container">
                <div>
                    CONTEMPORARY ARTIST <br/> CURRENTLY LIVING AND <br/> WORKING IN TULA.
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import {computed} from 'vue'
import { useRoute } from 'vue-router'

const getImageUrl = (path) => {
  return import.meta.env.BASE_URL + 'img/' + path
}

const route = useRoute()
const showHeader = computed(() => route.meta.showHeader)
</script>

<style scoped>
.wrapper {
    display: flex;
    width: 100%;
    max-width: 100vw;
    height: auto;
    flex-direction: column;
}

.svg-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
}

.info-container {
    display: flex;
    padding: 0 20px 0 70px
}

.info-text-container {
    display: flex;
    flex-direction: column-reverse;
    padding: 1rem;
    font-size: 40px;

    color: #000;
  
    text-shadow: 0 0 1px #89acff, 0 0 2px #89acff, 0 0 3px #89acff;
    text-align: justify; 
    flex: 1;
    min-width: 0;
    padding-bottom: 60px;
}

.photo-container {
    padding: 1rem;
    flex: 1.2;
    min-width: 0;
}

.header-photo {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
}

.title-wrapper {
  /* Базовые значения для мобильных */
  max-height: 170px;

  /* Плавные интерполяции между точками */
  @media (min-width: 550px) {
    max-height: calc(170px + (100vw - 550px) * (280 - 170) / (840 - 550));
  }

  @media (min-width: 840px) {
    max-height: calc(280px + (100vw - 840px) * (350 - 280) / (1000 - 840));
  }

  @media (min-width: 1000px) {
    max-height: calc(350px + (100vw - 1000px) * (450 - 350) / (1280 - 1000));
  }

  @media (min-width: 1280px) {
    max-height: 450px;
  }
}
</style>