<template>
    <div class="wrapper" v-if="showHeader">
        <img
            :src="`/img/title.svg`" 
            alt="Title"
            class="svg-image"
        />
        <div class="info-container">
            <div class="photo-container half-block">
                <img
                    :src="`/img/header_photo.jpg`" 
                    alt="photo"
                    class="header-photo"
                />
            </div>
            <div class="half-block">
                <div>
                    CONTEMPORARY ARTIST CURRENTLY LIVING AND WORKING IN TULA.
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import {computed} from 'vue'
import { useRoute } from 'vue-router'

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
}

.photo-container {
    padding: 1rem;
}

.half-block {
  flex: 1; /* Равное распределение пространства */
  min-width: 0; /* Фикс для переполнения контента */
}

.header-photo {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
}
</style>