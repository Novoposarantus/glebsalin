<template>
  <nav class="main-nav" ref="navRef" id="app-nav">
    <router-link to="/">
      <span>A</span>
      <span>B</span>
      <span>O</span>
      <span>U</span>
      <span>T</span>
    </router-link>
    <router-link to="/artworks">
      <span>A</span>
      <span>R</span>
      <span>T</span>
      <span>W</span>
      <span>O</span>
      <span>R</span>
      <span>K</span>
      <span>S</span>
    </router-link>
    <router-link to="/shop">
      <span>S</span>
      <span>H</span>
      <span>O</span>
      <span>P</span>
    </router-link>
    <router-link to="/contact">
      <span>C</span>
      <span>O</span>
      <span>N</span>
      <span>T</span>
      <span>A</span>
      <span>C</span>
      <span>T</span>
    </router-link>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Создаем ref для доступа к DOM-элементу <nav>
const navRef = ref(null);

// Функция, которая будет выполняться после монтирования компонента
onMounted(() => {
  // Проверяем, доступен ли элемент <nav>
  if (!navRef.value) {
    console.error("Элемент <nav> не найден (забыл добавить ref='navRef' в <template>?).");
    return;
  }

  // Находим все теги <a> (ссылки) внутри <nav>
  const links = navRef.value.querySelectorAll('a');

  // === ИЗМЕНЕНИЕ ЗДЕСЬ: Обрабатываем каждую ссылку индивидуально ===
  links.forEach(link => {
    // Находим все <span> (буквы) ТОЛЬКО внутри ТЕКУЩЕЙ ссылки
    const letterSpansInLink = link.querySelectorAll('span');

    // Флаг, который покажет, была ли сдвинута хотя бы одна буква в этом слове
    let hasShiftedLetter = false;

    // --- Первый проход: Применяем случайные классы ---
    letterSpansInLink.forEach(span => {
      // Сначала удаляем старые классы сдвига
      span.classList.remove('letter-up', 'letter-down');

      // Генерируем случайное число
      const randomChoice = Math.random();

      // С вероятностью ~30% добавляем класс 'letter-up'
      if (randomChoice < 0.3) {
        span.classList.add('letter-up');
        hasShiftedLetter = true; // Устанавливаем флаг, т.к. нашли сдвинутую букву
      }
      // С вероятностью ~30% добавляем класс 'letter-down'
      else if (randomChoice < 0.6) {
        span.classList.add('letter-down');
        hasShiftedLetter = true; // Устанавливаем флаг
      }
      // В остальных ~40% случаев класс не добавляется
    });

    // --- Второй проход (Коррекция): Если ни одна буква не была сдвинута ---
    // Проверяем флаг И наличие букв в слове (на всякий случай)
    if (!hasShiftedLetter && letterSpansInLink.length > 0) {
      // Выбираем случайный индекс буквы в текущем слове
      const randomIndex = Math.floor(Math.random() * letterSpansInLink.length);
      // Получаем случайный <span>
      const randomSpanToShift = letterSpansInLink[randomIndex];

      // Принудительно добавляем ему класс 'letter-up' или 'letter-down' (50/50)
      if (Math.random() < 0.5) {
        randomSpanToShift.classList.add('letter-up');
      } else {
        randomSpanToShift.classList.add('letter-down');
      }
      // console.log(`Forced shift in word: ${link.textContent.trim()}`); // Для отладки
    }
  }); // Конец обработки одной ссылки (forEach link)
}); // Конец onMounted
</script>
  
<style scoped>
  .main-nav {
    font-family: 'GlebSalinFont', sans-serif;
    display: flex;
    justify-content: center;
    padding: 5rem 3rem;

    justify-content: space-between;
  }
  
  .main-nav a { /* Стили для самих ссылок */
    color: #000; /* Цвет ссылок */
    text-decoration: none; /* Убрать подчеркивание */
    font-size: 8rem;
    letter-spacing: 0.5rem;
    margin: 0.5rem 0;
  }
  
  .router-link-active span {
    transform: translateY(0) !important;
  }

  .main-nav a span {
    display: inline-block; /* Чтобы transform работал */
    position: relative; /* Чтобы сдвиг не влиял на соседей */
    transition: transform 0.2s ease-out; /* Плавность для ховер-эффекта */
  }

  .main-nav a span.letter-up {
    transform: translateY(-5px); /* <- Настрой значение сдвига */
  }

  .main-nav a span.letter-down {
    transform: translateY(5px); /* <- Настрой значение сдвига */
  }

  .main-nav a:hover span {
    transform: translateY(0);
  }

  @media (max-width: 800px) { 
    .main-nav {
      padding: 1.5rem 0.5rem;
    }

    .main-nav a {
      font-size: 3rem;
      letter-spacing: 0.1em;
    }

    .main-nav a span.letter-up {
      transform: translateY(-3px);
    }

    .main-nav a span.letter-down {
      transform: translateY(3px);
    }
  }
</style>