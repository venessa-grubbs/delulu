// Ожидаем загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', () => {
  // Получаем элементы DOM
  const deluluBtn = document.getElementById('delulu-btn'); // Кнопка "delulu"
  const numberLike = document.querySelector('.analytics .data:nth-child(1) .number'); // Элемент с количеством лайков
  const numberShare = document.querySelector('.analytics .data:nth-child(2) .number'); // Элемент с количеством "Поделиться"

  // Ссылки на соцсети
  const telegramLink = document.querySelector('.telegram-link'); // Ссылка на Telegram
  const instagramLink = document.querySelector('.instagram-link'); // Ссылка на Instagram
  const tiktokLink = document.querySelector('.tiktok-link'); // Ссылка на TikTok

  // Получаем элемент изображения профиля
  const profileImg = document.querySelector('.profile-img'); // Изображение профиля

  // Исходная и новая картинки
  const originalImage = 'bec8f4da6c81d459138f6b062f3eb5c3.jpg';
  const newImage = 'https://i.pinimg.com/originals/08/5d/bd/085dbd6c04d37c531841e0dc751ea728.gif';

  // Загружаем сохраненное значение картинки из localStorage
  let currentImage = localStorage.getItem('currentImage') || originalImage;

  // Устанавливаем начальное значение картинки
  profileImg.src = currentImage;

  // Флаг для отслеживания текущего состояния
  let isOriginalImage = currentImage === originalImage;

  // Добавляем обработчик клика на изображение профиля
  profileImg.addEventListener('click', () => {
    if (isOriginalImage) {
      // Меняем картинку на новую
      profileImg.src = newImage;
      currentImage = newImage;
    } else {
      // Возвращаем исходную картинку
      profileImg.src = originalImage;
      currentImage = originalImage;
    }
    // Сохраняем текущую картинку в localStorage
    localStorage.setItem('currentImage', currentImage);
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
