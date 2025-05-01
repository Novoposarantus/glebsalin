<template>
    <section class="sarcophagus-section" ref="sectionRef">
      <div class="sarcophagus-container" ref="sarcophagusContainerRef">
  
        <img
          :src="getImageUrl(`lid-left.png`)" alt="Sarcophagus Left Lid"
          class="sarcophagus-lid sarcophagus-lid-left"
          ref="lidLeftRef"
        />
  
        <img
          :src="getImageUrl(`lid-right.png`)" alt="Sarcophagus Right Lid"
          class="sarcophagus-lid sarcophagus-lid-right"
          ref="lidRightRef"
        />

        <div class="sarcophagus-gallery-container" ref="galleryContainerRef">
            <div class="sarcophagus-gallery-track" ref="galleryTrackRef">
            </div>
        </div>
  
        </div>
    </section>
  </template>
  
<script setup>
    import { ref, onMounted, onUnmounted, nextTick } from 'vue';
    import gsap from 'gsap';
    import ScrollTrigger from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger); // Раскомментируй, если не регистрируешь глобально

    const getImageUrl = (path) => {
    return import.meta.env.BASE_URL + 'img/' + path;
    }

    // --- Refs ---
    const sectionRef = ref(null);              // Секция-триггер
    const sarcophagusContainerRef = ref(null); // Общий контейнер саркофага (нужен для ширины)
    const lidLeftRef = ref(null);              // Левая створка
    const lidRightRef = ref(null);             // Правая створка
    const galleryContainerRef = ref(null); // !!! Возвращаем ref для контейнера галереи
    const galleryTrackRef = ref(null);     // !!! Возвращаем ref для трека галереи
    // Refs для галереи удалены

    const galleryImages = [
        getImageUrl('main/1.jpg'),
        getImageUrl('main/2.jpg'),
        getImageUrl('main/4.jpg'),
        getImageUrl('main/5.jpg'),
        getImageUrl('main/6.jpg')
    ];

    // --- Переменные ---
    let scrollTriggerInstance = null;
    let openingTimeline = null;
    let loopAnimation = null;

    // Timeline для цикла удалена

    // --- Настройки ---
    const openAnimationDuration = 1.5;   // Длительность анимации открытия (секунды)
    const loopScrollSpeedFactor = 6;

    function waitForImageLoad(imageElement) {
    return new Promise((resolve, reject) => {
        if (imageElement.complete && imageElement.naturalHeight !== 0) {
            resolve();
        } else {
        imageElement.addEventListener('load', resolve, { once: true });
        imageElement.addEventListener('error', reject, { once: true });
        }
    });
    }

    onMounted(async () => {
    const sectionElement = sectionRef.value;
    const sarcophagusContainerElement = sarcophagusContainerRef.value;
    const lidLeftElement = lidLeftRef.value;
    const lidRightElement = lidRightRef.value;
    const galleryContainerElement = galleryContainerRef.value; // !!! Используем ref
    const trackElement = galleryTrackRef.value; 

    if (!sectionElement || !sarcophagusContainerElement || !lidLeftElement || !lidRightElement || !galleryContainerElement || !trackElement) {
        console.error("Sarcophagus Animation Error: Required DOM elements not found! Check refs.");
        return;
    }

    trackElement.innerHTML = ''; // Очищаем трек
    const fragment = document.createDocumentFragment(); // Используем фрагмент для эффективности
    const originalItems = []; // Сохраним оригинальные элементы для дублирования

    galleryImages.forEach((imageUrl, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-item-wrapper'; // Обертка
        const img = document.createElement('img');
        img.className = 'gallery-item-image';       // Картинка
        img.src = imageUrl;
        img.alt = `Gallery image ${index + 1}`;
        wrapper.appendChild(img);
        trackElement.appendChild(wrapper);         // Добавляем в трек
        originalItems.push(wrapper);
    });
    originalItems.forEach(item => {
        fragment.appendChild(item.cloneNode(true)); // Добавляем клон во фрагмент
    });
    trackElement.appendChild(fragment);


    await nextTick(); // Ждем рендера для расчета размеров

    await Promise.all([
        waitForImageLoad(lidLeftElement),
        waitForImageLoad(lidRightElement)
    ]);

    // --- Расчеты для позиционирования створок ---
    const containerWidth = sarcophagusContainerElement.offsetWidth;
    const lidLeftWidth = lidLeftElement.offsetWidth;
    const lidRightWidth = lidRightElement.offsetWidth;

    // Начальные позиции створок (центр)
    gsap.set(lidLeftElement, { xPercent: -100, left: '50%' });
    gsap.set(lidRightElement, { xPercent: 0, left: '50%' });

    gsap.set(galleryContainerElement, { clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' });

    // Конечные позиции створок
    const finalXLeft = - containerWidth / 2 + lidLeftWidth;
    const finalXRight = containerWidth / 2 - lidRightWidth;

    const finalInsetLeftPercent = (lidLeftWidth / containerWidth) * 100 - 1;
    const finalInsetRightPercent = (lidRightWidth / containerWidth) * 100 - 1;
    const finalPolygon = `polygon(${finalInsetLeftPercent}% 0%, ${100 - finalInsetRightPercent}% 0%, ${100 - finalInsetRightPercent}% 100%, ${finalInsetLeftPercent}% 100%)`;

    let originalTrackWidth = 0;
    for (let i = 0; i < originalItems.length; i++) {
        // Суммируем ширину включая margin (предполагаем margin задан в vw или %, переводим в px если нужно, или используем getComputedStyle)
        // Простой вариант: используем offsetWidth + margin (если он в px)
        // Более точный: getBoundingClientRect().width + computed margin
        const style = window.getComputedStyle(originalItems[i]);
        const marginRight = parseFloat(style.marginRight) || 0;
        const marginLeft = parseFloat(style.marginLeft) || 0;
        originalTrackWidth += originalItems[i].offsetWidth + marginLeft + marginRight;
    }
    console.log(`Original track width for loop: ${originalTrackWidth}`);
    
    openingTimeline = gsap.timeline({
        paused: true,
        defaults: { ease: "none", duration: openAnimationDuration }
    });

    openingTimeline
        .to(lidLeftElement, { x: finalXLeft }, 0)
        .to(lidRightElement, { x: finalXRight }, "<")
        .to(galleryContainerElement, {
            clipPath: finalPolygon
        }, "<");

    // --- 4. Анимация БЕСКОНЕЧНОГО ЦИКЛА/СКРОЛЛА Галереи ---
    // Создаем отдельную анимацию GSAP .to() с повторением
    if (originalTrackWidth > 0) {
        loopAnimation = gsap.to(trackElement, {
            x: -originalTrackWidth, // Сдвигаем влево на ширину оригинального набора
            duration: originalItems.length * loopScrollSpeedFactor, // Длительность одного цикла (настрой)
            ease: "none",      // Линейное движение
            repeat: -1,        // Бесконечное повторение
            paused: true       // Начнется только после открытия по onComplete
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
  
  <style>
  /* Секция саркофага */
  .sarcophagus-section {
    position: relative;
    height: 500px; /* Высота всей области */
    overflow: hidden;
    margin: 0 3rem;
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
    left: 50%; /* База для начального позиционирования */
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

}

/* Трек галереи */
.sarcophagus-gallery-track {
  display: inline-flex; /* Картинки в ряд, ширина по контенту */
  align-items: center; /* Выравниваем обертки по вертикали */
  height: 80%; /* Высота трека (настрой) */
  /* Начальное положение X = 0 */
  /* background-color: rgba(0, 0, 255, 0.1); для отладки */
}

/* Обертка для каждой картинки в галерее */
.gallery-item-wrapper {
  flex-shrink: 0; /* Не сжиматься */
  height: 100%; /* Занимать всю высоту трека */
  max-width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  
  @media (max-width: 800px) { 
    .sarcophagus-section {
      margin: 0 0.5rem;
    }
  }
  @media (max-width: 500px) { 
    .sarcophagus-gallery-container {
        top: 20px;
    }

    .sarcophagus-section {
        height: 200px;
    }
  }
  </style>