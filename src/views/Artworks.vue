<template>
  <div>
    <div class="artwork-grid">
      <div
        v-for="(image, idx) in artworkImages" :key="image.high || idx"
        class="artwork-item"
        @click="showLightbox(idx)" >
        <ProgressiveImage
          :lowSrc="image.low"
          :highSrc="image.high"
          :alt="image.alt || `Artwork ${idx + 1}`"
          class="artwork-thumbnail"
          loading="lazy"
        />
      </div>
    </div>

    <VueEasyLightbox
      :visible="lightboxVisible"
      :imgs="lightboxImages"
      :index="lightboxIndex"
      @hide="handleLightboxHide"
      :moveDisabled="true"
      :rotateDisabled="true"
    />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// Импортируем библиотеку и ее CSS
import VueEasyLightbox from 'vue-easy-lightbox';
import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css';

// Импортируем данные и компонент ProgressiveImage
import { config } from '../config';
import ProgressiveImage from '../components/ProgressiveImage.vue';

// Массив картинок для галереи (объекты {low, high, alt})
const artworkImages = ref(config.artworkGalleryImages || []);

// --- Состояние Лайтбокса ---
const lightboxVisible = ref(false); // Видимость лайтбокса
const lightboxIndex = ref(0);     // Индекс текущей картинки для лайтбокса

// --- Подготовка данных для Лайтбокса ---
// Библиотеке обычно нужен массив строк - URL картинок (используем high-res)
const lightboxImages = computed(() => {
  return artworkImages.value.map(img => img.high || img.low); // Берем high, если нет - low
});

// --- Функции Лайтбокса ---
// Открывает лайтбокс на КЛИКНУТОМ индексе
const showLightbox = (index) => {
  console.log(`Showing lightbox at index: ${index}`);
  lightboxIndex.value = index; // Устанавливаем индекс картинки, по которой кликнули
  lightboxVisible.value = true;  // Показываем лайтбокс
  // Блокировка скролла обычно обрабатывается библиотекой
};

// Закрывает лайтбокс (вызывается событием @hide)
const handleLightboxHide = () => {
  console.log('Hiding lightbox');
  lightboxVisible.value = false; // Скрываем лайтбокс
  // Разблокировка скролла обычно обрабатывается библиотекой
};

</script>

<style scoped>
/* Стили для .artwork-grid, .artwork-item, .artwork-thumbnail остаются */
.artwork-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem 0;
}

.artwork-item {
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.artwork-thumbnail {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1; /* Квадратные плитки */
  object-fit: cover;
  transition: transform 0.3s ease-out;
}

.artwork-item:hover .artwork-thumbnail {
  transform: scale(1.05);
}

/* Стили для нашей старой реализации лайтбокса (.lightbox-overlay и т.д.) УДАЛЕНЫ */

/* --- Адаптивность сетки --- */
@media (max-width: 600px) {
  .artwork-grid {
    grid-template-columns: 1fr; /* Одна колонка */
    gap: 1rem;
  }
   .artwork-thumbnail {
     aspect-ratio: 4 / 3;
  }
}

/* Библиотека vue-easy-lightbox сама добавит свои стили для окна лайтбокса, */
/* но их можно переопределить при необходимости через CSS или опции компонента */
</style>