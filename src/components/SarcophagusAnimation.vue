<template>
    <section class="sarcophagus-section" ref="sectionRef">
      <div class="sarcophagus-container" ref="sarcophagusContainerRef">
  
        <img :src="getImageUrl(`lid-left.png`)" alt="Sarcophagus Left Lid"
           class="sarcophagus-lid sarcophagus-lid-left" ref="lidLeftRef"/>
        <img :src="getImageUrl(`lid-right.png`)" alt="Sarcophagus Right Lid"
            class="sarcophagus-lid sarcophagus-lid-right" ref="lidRightRef"/>

        <div class="sarcophagus-gallery-container" ref="galleryContainerRef">
            <div class="sarcophagus-gallery-track" ref="galleryTrackRef">
                <div v-for="(image, index) in galleryImages"
                    :key="image.high || index" class="gallery-item-wrapper">
                    <ProgressiveImage
                        :ref="el => { if (el) imageComponentRefs[index] = el }"
                        :lowSrc="image.low"
                        :highSrc="image.high"
                        :alt="image.alt || `Gallery image ${index + 1}`"
                        class="gallery-item-image"
                        loading="lazy" />
                </div>
                </div>
        </div>
  
        </div>
    </section>
  </template>
  
<script setup>
    import { ref, onMounted, onUnmounted, nextTick } from 'vue';
    import gsap from 'gsap';
    import ScrollTrigger from 'gsap/ScrollTrigger';
    import ProgressiveImage from '../components/ProgressiveImage.vue';
    import { config } from '../config';
    import { imgHelper } from '../helpers';

    const getImageUrl = imgHelper.getImageUrl;
    gsap.registerPlugin(ScrollTrigger);

    const sectionRef = ref(null);       
    const sarcophagusContainerRef = ref(null); 
    const lidLeftRef = ref(null);          
    const lidRightRef = ref(null);       
    const galleryContainerRef = ref(null); 
    const galleryTrackRef = ref(null); 
    const imageComponentRefs = ref([]);

    const galleryImages = ref([...config.mainImagesConfig, ...config.mainImagesConfig]);

    let scrollTriggerInstance = null;
    let openingTimeline = null;
    let loopAnimation = null;

    onMounted(async () => {
        const sectionElement = sectionRef.value;
        const sarcophagusContainerElement = sarcophagusContainerRef.value;
        const lidLeftElement = lidLeftRef.value;
        const lidRightElement = lidRightRef.value;
        const galleryContainerElement = galleryContainerRef.value;
        const trackElement = galleryTrackRef.value; 

        if (!sectionElement || !sarcophagusContainerElement || !lidLeftElement || !lidRightElement || !galleryContainerElement || !trackElement) {
            console.error("Sarcophagus Animation Error: Required DOM elements not found! Check refs.");
            return;
        }

        await nextTick();
        const lidPromises = [
            imgHelper.waitForImageLoad(lidLeftElement),
            imgHelper.waitForImageLoad(lidRightElement)
        ];
        const galleryLowResPromises = imageComponentRefs.value
            .map(componentInstance => componentInstance?.lowResLoadPromise)
            .filter(promise => !!promise);
        
        //console.log("Promise.all before", galleryLowResPromises)
        await Promise.all([
            ...lidPromises,
            ...galleryLowResPromises
        ]);
        //console.log("Promise.all after", galleryLowResPromises)
        
        const containerWidth = sarcophagusContainerElement.offsetWidth;
        const lidLeftWidth = lidLeftElement.offsetWidth;
        const lidRightWidth = lidRightElement.offsetWidth;
        //console.log('containerWidth', containerWidth, 'lidLeftWidth', lidLeftWidth, 'lidRightWidth', lidRightWidth)

        gsap.set(lidLeftElement, { xPercent: -100, left: '50%' });
        gsap.set(lidRightElement, { xPercent: 0, left: '50%' });
        gsap.set(galleryContainerElement, { clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' });

        const finalXLeft = - containerWidth / 2 + lidLeftWidth;
        const finalXRight = containerWidth / 2 - lidRightWidth;

        const finalInsetLeftPercent = (lidLeftWidth / containerWidth) * 100 - 1;
        const finalInsetRightPercent = (lidRightWidth / containerWidth) * 100 - 1;
        const finalPolygon = `polygon(${finalInsetLeftPercent}% 0%, ${100 - finalInsetRightPercent}% 0%, ${100 - finalInsetRightPercent}% 100%, ${finalInsetLeftPercent}% 100%)`;
        
        const galleryItemWrappers = trackElement.querySelectorAll('.gallery-item-wrapper');
        let originalTrackWidth = 0;
        // Суммируем ширину ПЕРВОЙ ПОЛОВИНЫ элементов (оригиналы)
        const halfLength = Math.floor(galleryItemWrappers.length / 2); // Должно быть равно originalImages.length
        for (let i = 0; i < halfLength; i++) {
            if (galleryItemWrappers[i]) {
                const style = window.getComputedStyle(galleryItemWrappers[i]);
                const marginRight = parseFloat(style.marginRight) || 0;
                const marginLeft = parseFloat(style.marginLeft) || 0;
                originalTrackWidth += galleryItemWrappers[i].offsetWidth + marginLeft + marginRight;
            }
        }

        openingTimeline = gsap.timeline({
            paused: true,
            defaults: { ease: "none", duration: config.openSarcophagusAnimationDuration }
        });

        openingTimeline
            .to(lidLeftElement, { x: finalXLeft }, 0)
            .to(lidRightElement, { x: finalXRight }, "<")
            .to(galleryContainerElement, { clipPath: finalPolygon }, "<");

        // --- Анимация БЕСКОНЕЧНОГО ЦИКЛА/СКРОЛЛА Галереи ---
        if (originalTrackWidth > 0 && config.mainImagesConfig.length > 0) { // Добавил проверку originalImages.length
            loopAnimation = gsap.to(trackElement, {
                x: -originalTrackWidth,
                duration: config.mainImagesConfig.length * config.sliderSpeed, // Используем длину ОРИГИНАЛЬНОГО массива
                ease: "none",
                repeat: -1,
                paused: true
            });
        }

        scrollTriggerInstance = ScrollTrigger.create({
            trigger: sectionElement,
            start: "bottom bottom", 
            once: true, // Сработать один раз

            onEnter: () => {
                if (openingTimeline) {
                    openingTimeline.play();
                }
                if (loopAnimation) {
                    console.log("plage loop")
                    loopAnimation.play(); // Запускаем цикл после открытия
                }
            },
        });

    });

    onUnmounted(() => {
        // Очистка
        if (scrollTriggerInstance) scrollTriggerInstance.kill();
        if (openingTimeline) openingTimeline.kill();
    });

  </script>
  
<style scoped>
  /* Секция саркофага */
    .sarcophagus-section {
        position: relative;
        height: 500px;
        overflow: hidden;
        margin: 0 3rem;

        /* Адаптивные отступы */
        @media (max-width: 800px) { 
            margin: 0 0.5rem; 
        }
        /* Адаптивная высота */
        @media (max-width: 500px) { 
            height: 200px; 
        }
    }
  
    /* Контейнер для позиционирования внутри секции */
    .sarcophagus-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
  
  /* Створки саркофага */
    .sarcophagus-lid {
        position: absolute;
        top: 50%;
        left: 50%;
        width: auto;
        height: auto;
        max-height: 90%;
        max-width: 45%;
        object-fit: contain;
        transform: translateY(-50%); /* Вертикальное центрирование */
        z-index: 2; /* Створки поверх всего (если что-то будет за ними) */
    }

/* === ВОЗВРАЩАЕМ СТИЛИ ГАЛЕРЕИ === */

/* Контейнер галереи (маска) */
    .sarcophagus-gallery-container {
        position: absolute;
        top: 40px; left: 0; width: 100%; height: 90%;
        z-index: 1; /* Под створками */
        /* clip-path задается через GSAP */
        overflow: hidden; /* Дополнительная обрезка */
        display: flex; /* Для выравнивания трека */
        align-items: center; /* Выравниваем трек по вертикали */
        
        @media (max-width: 500px) { 
            top: 20px;
            height: calc(100% - 40px); 
        }
    }

/* Трек галереи */
    .sarcophagus-gallery-track {
        display: inline-flex; 
        align-items: center;
        height: 80%;
    }

    /* Обертка для каждой картинки в галерее */
    .gallery-item-wrapper {
        flex-shrink: 0; /* Не сжиматься */
        height: 100%; /* Занимать всю высоту трека */
        max-width: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (max-width: 400px) { 
            max-width: 120px; 
        }
    }

/* Сама картинка галереи */
    .gallery-item-image {
        display: block;
        width: 100%; /* Стараемся заполнить обертку */
        height: 100%;
        max-width: 100%; /* Не вылезать за обертку */
        max-height: 100%;
        object-fit: contain; /* Вписываем картинку пропорционально */
    }
/* === Конец стилей галереи === */

/* Контент после */
    .content-after {
        height: 500px; background-color: green; display: flex;
        align-items: center; justify-content: center; color: white; font-size: 1.5rem;
    }
</style>