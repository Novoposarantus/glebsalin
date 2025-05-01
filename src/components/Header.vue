<template>
    <div class="wrapper" v-if="showHeader" id="app-header">
        <div class="title-wrapper" ref="titleWrapperRef">
            <img
                :src="getImageUrl(`title.svg`)"
                alt="Title"
                class="svg-image"
            />
        </div>
        <div class="info-container">
            <div class="photo-container">
                <img
                    :src="getImageUrl(`photo_with_border.jpg`)" 
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
/* === Основной контейнер хедера === */
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative; /* Необходимо для позиционирования и z-index дочерних элементов */
    padding-top: 10px;
}

/* === Контейнер для SVG заголовка === */
.title-wrapper {
  max-height: 125px;
  @media (min-width: 300px) {
    max-height: 125px;
  }
  @media (min-width: 350px) {
    max-height: 145px;
  }
  @media (min-width: 400px) {
    max-height: 160px;
  }
  @media (min-width: 500px) {
    max-height: 310px;
  }
  @media (min-width: 600px) {
    max-height: 310px;
  }
  @media (min-width: 700px) {
    max-height: 310px;
  }
  @media (min-width: 800px) {
    max-height: 320px;
  }
  @media (min-width: 900px) {
    max-height: 380px;
  }
  @media (min-width: 1000px) {
    max-height: 460px;
  }
  @media (min-width: 1100px) {
    max-height: 460px;
  }
  @media (min-width: 1280px) {
    max-height: 500px;
  }
}

/* === Сам SVG заголовок === */
.svg-image {
    display: block; /* Убирает лишние отступы */
    width: 100%;
    height: 100%; /* Заполняет высоту родителя (.title-wrapper) */
    object-fit: contain; /* Сохраняет пропорции, вписывая в контейнер */
}

/* === Контейнер для фото и текста === */
.info-container {
    display: flex; /* Располагает фото и текст рядом (на десктопе) */
    position: relative; /* Позволяет элементам внутри перекрываться правильно */
    z-index: 1; /* Гарантирует, что этот блок будет выше фона */
}

/* === Контейнер для текста === */
.info-text-container {
    flex: 1;
    min-width: 0;
    padding: 0 0 4rem 2rem; /* Отступы внутри блока (Сверху, По бокам, Снизу) */

    /* === ДОБАВЛЕНИЕ ЗДЕСЬ === */
    /* Добавляем левый отступ, чтобы отодвинуть текст от фото */
    /* Попробуй 2rem или другое значение (3rem, 5%, 3vw?) */
    margin-left: 2rem; /* Настрой это значение! */

    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* Прижимаем текст к нижнему краю */

    color: #000;
    text-align: justify;
    /* --- ТРЕБУЕТ НАСТРОЙКИ --- */
    font-size: 36px;
    text-shadow: 0 0 4px rgba(100, 150, 255, 0.7), 0 0 6px rgba(100, 150, 255, 0.5);
     @media (max-width: 1000px) {
        font-size: 30px;
     }
     /* На мобильных этот блок скрыт */
     @media (max-width: 860px) {
        display: none;
     }
}

/* === Контейнер для фото === */
.photo-container {
    flex: 1.1; /* Делает блок с фото немного шире блока с текстом */
    min-width: 0; /* Предотвращает выталкивание */
    padding: 0; /* Отступ вокруг фото (на десктопе) */
}

/* === Само фото === */
.header-photo {
    display: block;
    width: 100%;
    height: auto; /* Автоматическая высота для сохранения пропорций */
    /* или можно задать aspect-ratio для большей предсказуемости */
    /* aspect-ratio: 4 / 3; */
    object-fit: cover; /* Масштабирует фото, чтобы покрыть контейнер, обрезая лишнее */
}


/* === АДАПТАЦИЯ ДЛЯ МОБИЛЬНЫХ === */
@media (max-width: 860px) { /* Порог можно изменить */

  /* 1. Скрываем текстовый блок */
  .info-text-container {
    display: none;
  }

  /* 2. Настраиваем контейнер фото и текста (теперь только для фото) */
  .info-container {
     /* Выравниваем единственный элемент (фото) по левому краю */
     justify-content: flex-start;
     align-items: flex-start; /* Выравнивание по верху */
  }

  /* 3. Настраиваем контейнер фото */
  .photo-container {
      /* Убираем flex-grow/shrink, задаем ширину */
      flex: 0 0 auto; /* Не растягивать, не сжимать, базовая ширина auto */

      /* --- ТРЕБУЕТ НАСТРОЙКИ --- */
      /* Задаем ширину фото-контейнера */
      width: 60%; /* Подбери значение! (%, px, vw) */
      max-width: 350px; /* Подбери значение! */
  }
}
</style>