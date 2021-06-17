const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

function generateCard(data) {
  const card = cardTemplate.cloneNode(true);
  // Загаловок
  card.querySelector('.popup__title').textContent = data.offer.title;

  // Адрес
  card.querySelector('.popup__text--address').textContent = data.offer.address;

  // Цена
  card.querySelector('.popup__text--price').innerHTML = `<p>${data.offer.price}<span>₽/ночь</span></p>`;
  if (typeof data.offer.price !== 'number') {
    card.querySelector('.popup__text--price').remove();
  }
  // Тип
  if (data.offer.type === 'palace') {
    card.querySelector('.popup__type').textContent = 'Дворец';
  } else if (data.offer.type === 'flat') {
    card.querySelector('.popup__type').textContent = 'Квартира';
  } else if (data.offer.type === 'bungalow') {
    card.querySelector('.popup__type').textContent = 'Бунгало';
  } else if (data.offer.type === 'house') {
    card.querySelector('.popup__type').textContent = 'Дом';
  } else if (data.offer.type === 'hotel') {
    card.querySelector('.popup__type').textContent = 'Отель';
  }

  // Количество комнат и гостей
  card.querySelector('.popup__text--capacity').innerHTML =
    `<p>${data.offer.rooms} комнаты для ${data.offer.guests} гостей</p>`;
  if (typeof data.offer.guests !== 'number' || typeof data.offer.rooms !== 'number') {
    card.querySelector('.popup__text--capacity').remove();
  }

  // Время выезда и заезда
  card.querySelector('.popup__text--time').innerHTML =
    `<p>Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}</p>`;
  if (typeof data.offer.checkin !== 'number' || typeof data.offer.checkout !== 'number') {
    card.querySelector('.popup__text--time').remove();
  }

  // Особенности
  const featuresList = card.querySelector('.popup__features');
  const modifiers = data.offer.features.map(
    (feature) => `popup__feature--${feature}`,
  );
  featuresList.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });

  // Описание
  card.querySelector('.popup__description').textContent = data.offer.description;

  // Фотографии
  const photos = card.querySelector('.popup__photos');
  if (data.offer.photos.length <= 0) {
    photos.remove();
  }
  photos.querySelector('.popup__photo').setAttribute('src', data.offer.photos[0]);
  for (let i = 1; data.offer.photos.length > photos.children.length; i++) {
    const newPhoto = photos.querySelector('.popup__photo').cloneNode(true);
    newPhoto.setAttribute('src', data.offer.photos[i]);
    photos.appendChild(newPhoto);
  }

  // Аватарка
  card.querySelector('.popup__avatar').setAttribute('src', data.author.avatar);
  card.querySelector('.popup__avatar').onerror = function () {
    card.querySelector('.popup__avatar').setAttribute('src', 'img/avatars/default.png');
  };
  if (card.querySelector('.popup__avatar').getAttribute('src') === 'undefined') {
    card.querySelector('.popup__avatar').remove();
  }

  mapCanvas.appendChild(card);
}

export {
  generateCard
};
