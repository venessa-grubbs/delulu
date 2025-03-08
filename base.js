// Ожидаем загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', () => {
  // Получаем элементы DOM
  const deluluBtn = document.getElementById('delulu-btn'); // Кнопка "delulu"
  const numberLike = document.querySelector('.analytics .data:nth-child(1) .number'); // Элемент с количеством лайков
  const heartIcon = document.querySelector('.analytics .data:nth-child(1) i'); // Иконка сердечка
  const numberShare = document.querySelector('.analytics .data:nth-child(2) .number'); // Элемент с количеством "Поделиться"

  // Ссылки на соцсети
  const telegramLink = document.querySelector('.telegram-link'); // Ссылка на Telegram
  const instagramLink = document.querySelector('.instagram-link'); // Ссылка на Instagram
  const tiktokLink = document.querySelector('.tiktok-link'); // Ссылка на TikTok

  // Получаем элемент изображения профиля и его контейнер
  const profileImg = document.querySelector('.profile-img'); // Изображение профиля
  const imageContainer = document.querySelector('.image'); // Контейнер изображения

  // Получаем элементы фона страницы и карточки профиля
  const bodyElement = document.body; // Элемент body (фон страницы)
  const profileCard = document.querySelector('.profile-card'); // Карточка профиля

  // Получаем кнопки социальных сетей
  const mediaButtons = document.querySelectorAll('.media-buttons .link'); // Все кнопки социальных сетей

  // Исходная и новая картинки
  const originalImage = 'bec8f4da6c81d459138f6b062f3eb5c3.jpg';
  const newImage = 'https://i.pinimg.com/originals/08/5d/bd/085dbd6c04d37c531841e0dc751ea728.gif';

  // Исходные и новые фоны для body и profile-card
  const originalBodyBackground = 'https://i.pinimg.com/originals/0a/dd/ed/0added3a3851a997ad32af496c74d149.gif';
  const newBodyBackground = 'https://i.pinimg.com/736x/a9/ee/6e/a9ee6eb7c9986de01ee4f589e74fbc7c.jpg';

  const originalCardBackground = 'https://i.pinimg.com/736x/54/a5/b0/54a5b0ce55d2096017ac8392557b529d.jpg';
  const newCardBackground = 'https://i.pinimg.com/736x/73/2a/ec/732aecb88346dcd89201a45802981610.jpg';

  // Исходные и новые цвета для media-buttons и image
  const originalMediaButtonColor = '#a7aefb'; // Исходный цвет кнопок
  const newMediaButtonColor = '#ffff'; // Новый цвет кнопок

  const originalImageBorderColor = '#191970'; // Исходный цвет рамки изображения
  const newImageBorderColor = '#ffff'; // Новый цвет рамки изображения

  // Загружаем сохраненные значения из localStorage
  let currentImage = localStorage.getItem('currentImage') || originalImage;
  let currentBodyBackground = localStorage.getItem('currentBodyBackground') || originalBodyBackground;
  let currentCardBackground = localStorage.getItem('currentCardBackground') || originalCardBackground;
  let currentMediaButtonColor = localStorage.getItem('currentMediaButtonColor') || originalMediaButtonColor;
  let currentImageBorderColor = localStorage.getItem('currentImageBorderColor') || originalImageBorderColor;

  // Устанавливаем начальные значения картинки, фонов и цветов
  profileImg.src = currentImage;
  bodyElement.style.backgroundImage = `url(${currentBodyBackground})`;
  profileCard.style.backgroundImage = `url(${currentCardBackground})`;
  mediaButtons.forEach(button => button.style.backgroundColor = currentMediaButtonColor);
  imageContainer.style.backgroundColor = currentImageBorderColor;

  // Флаг для отслеживания текущего состояния
  let isOriginalImage = currentImage === originalImage;

  // Добавляем обработчик клика на изображение профиля
  profileImg.addEventListener('click', () => {
    if (isOriginalImage) {
      // Меняем картинку, фоны и цвета на новые
      profileImg.src = newImage;
      bodyElement.style.backgroundImage = `url(${newBodyBackground})`;
      profileCard.style.backgroundImage = `url(${newCardBackground})`;
      mediaButtons.forEach(button => button.style.backgroundColor = newMediaButtonColor);
      imageContainer.style.backgroundColor = newImageBorderColor;
      currentImage = newImage;
      currentBodyBackground = newBodyBackground;
      currentCardBackground = newCardBackground;
      currentMediaButtonColor = newMediaButtonColor;
      currentImageBorderColor = newImageBorderColor;
    } else {
      // Возвращаем исходные картинку, фоны и цвета
      profileImg.src = originalImage;
      bodyElement.style.backgroundImage = `url(${originalBodyBackground})`;
      profileCard.style.backgroundImage = `url(${originalCardBackground})`;
      mediaButtons.forEach(button => button.style.backgroundColor = originalMediaButtonColor);
      imageContainer.style.backgroundColor = originalImageBorderColor;
      currentImage = originalImage;
      currentBodyBackground = originalBodyBackground;
      currentCardBackground = originalCardBackground;
      currentMediaButtonColor = originalMediaButtonColor;
      currentImageBorderColor = originalImageBorderColor;
    }
    // Сохраняем текущие значения в localStorage
    localStorage.setItem('currentImage', currentImage);
    localStorage.setItem('currentBodyBackground', currentBodyBackground);
    localStorage.setItem('currentCardBackground', currentCardBackground);
    localStorage.setItem('currentMediaButtonColor', currentMediaButtonColor);
    localStorage.setItem('currentImageBorderColor', currentImageBorderColor);
    // Меняем состояние флага
    isOriginalImage = !isOriginalImage;
  });

  // Функция для загрузки значений из localStorage
  const loadCounters = () => {
    if (localStorage.getItem('likes')) {
      numberLike.textContent = localStorage.getItem('likes'); // Загружаем лайки
    }
    if (localStorage.getItem('shares')) {
      numberShare.textContent = localStorage.getItem('shares'); // Загружаем "Поделиться"
    }
  };

  // Функция для сохранения значений в localStorage
  const saveCounter = (key, value) => {
    localStorage.setItem(key, value); // Сохраняем значение в localStorage
  };

  // Загружаем счетчики при загрузке страницы
  loadCounters();

  // Функция для увеличения числа лайков при нажатии на кнопку "delulu"
  if (deluluBtn && numberLike) {
    deluluBtn.addEventListener('click', () => {
      let currentLike = parseInt(numberLike.textContent); // Получаем текущее значение лайков
      numberLike.textContent = currentLike + 1; // Увеличиваем значение на 1
      saveCounter('likes', numberLike.textContent); // Сохраняем новое значение

      // Добавляем анимацию к сердечку
      heartIcon.classList.add('animate-heart');
      // Убираем класс анимации после завершения
      setTimeout(() => {
        heartIcon.classList.remove('animate-heart');
      }, 500); // Время анимации 0.5s
    });
  } else {
    console.error('Элементы не найдены! Проверьте селекторы.');
  }

  // Функция для увеличения счетчика "Поделиться" и открытия ссылки в новой вкладке
  const handleShareClick = (event) => {
    event.preventDefault(); // Отменяем стандартное поведение ссылки
    let currentShare = parseInt(numberShare.textContent); // Получаем текущее значение "Поделиться"
    numberShare.textContent = currentShare + 1; // Увеличиваем значение на 1
    saveCounter('shares', numberShare.textContent); // Сохраняем новое значение

    // Открываем ссылку в новой вкладке
    const url = event.currentTarget.href; // Получаем URL ссылки
    window.open(url, '_blank'); // Открываем в новой вкладке
  };

  // Добавляем обработчики для ссылок
  if (telegramLink && instagramLink && tiktokLink && numberShare) {
    telegramLink.addEventListener('click', handleShareClick);
    instagramLink.addEventListener('click', handleShareClick);
    tiktokLink.addEventListener('click', handleShareClick);
  } else {
    console.error('Ссылки или счетчик "Поделиться" не найдены! Проверьте селекторы.');
  }
});
