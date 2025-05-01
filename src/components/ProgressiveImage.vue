<template>
    <img
      :src="currentSrc"
      v-bind="$attrs"
      :class="['progressive-image', { 'is-loaded': isHighResLoaded }]"
      @load="onImageLoad"
      ref="imageRef"
    />
</template>
  
<script setup>
  import { ref, watch, onMounted, computed } from 'vue';
  
  // --- Props ---
    const props = defineProps({
        lowSrc: {
            type: String,
            required: true
        },
        highSrc: {
            type: String,
            required: true
        }
    });
  
  // --- Internal State ---
    const imageRef = ref(null); // Ref для доступа к DOM-элементу img
    const currentSrc = ref(props.lowSrc); // Начинаем с low-res версии
    const isLowResLoaded = ref(false);
    const isHighResLoaded = ref(false);  // Флаг загрузки high-res

    let resolveLowResLoad;
    const lowResLoadPromise = new Promise(resolve => { resolveLowResLoad = resolve; });
  
    // --- Logic ---
  
    // Функция для запуска загрузки high-res версии
    const loadHighRes = () => {
        if (!props.highSrc) return; // Выходим, если нет highSrc
    
        const highResImage = new Image();
        highResImage.onload = () => {
            currentSrc.value = props.highSrc;
            isHighResLoaded.value = true;   
        };
        highResImage.src = props.highSrc; // Запускаем загрузку
    };
  
    watch(() => props.highSrc, (newHighSrc, oldHighSrc) => {
        if (newHighSrc && newHighSrc !== oldHighSrc) {
            isHighResLoaded.value = false;
            currentSrc.value = props.lowSrc;
            loadHighRes();
        }
    }, { immediate: false });
    
  onMounted(() => {
        // Проверяем, не загружена ли low-res уже (из кеша)
        const imgEl = imageRef.value;
        //console.log(imgEl, imgEl.complete, imgEl.naturalHeight, imgEl.src, props.lowSrc);
        if (imgEl && imgEl.complete && imgEl.naturalHeight !== 0 && imgEl.src.endsWith(props.lowSrc)) {
            //console.log('[ProgressiveImage onMounted] Low-res already complete on mount:', props.lowSrc);
            isLowResLoaded.value = true;
            if (resolveLowResLoad) resolveLowResLoad(); // Сразу разрешаем Promise
        }
        // Загрузка high-res запускается в любом случае (или по условию)
        requestAnimationFrame(() => { loadHighRes(); });
    });
  
    const onImageLoad = (event) => {
        const loadedSrc = event.target.src;
        if (loadedSrc.endsWith(props.lowSrc) && !isLowResLoaded.value) {
            isLowResLoaded.value = true;
            if (resolveLowResLoad) resolveLowResLoad(); // Разрешаем Promise для low-res
            //console.log('[ProgressiveImage onImageLoad] DOM image load event for low-res:', loadedSrc);
        }
        else if (loadedSrc.endsWith(props.highSrc)) {
            isHighResLoaded.value = true;
            if (resolveLowResLoad) resolveLowResLoad();
            //console.log('[ProgressiveImage onImageLoad] DOM image load event for high-res:', loadedSrc);
        }
    };
    defineExpose({
        isLowResLoaded: computed(() => isLowResLoaded.value), // Экспонируем как computed для реактивности
        lowResLoadPromise
    });
  
</script>
  
<style scoped>
    .progressive-image {
        opacity: 1;
        filter: blur(5px);
        transition: opacity 0.4s ease-in-out, filter 0.4s ease-in-out;
    }

    .progressive-image.is-loaded {
        filter: blur(0);
    }

</style>