const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');
const offerType = {
  palace: 'Дворец',
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  hotel: 'Отель',
};

function generateCard(data) {
  const card = cardTemplate.cloneNode(true);
  // Загаловок
  card.querySelector('.popup__title').textContent = data.offer.title;

  // Адрес
  card.querySelector('.popup__text--address').textContent = data.offer.address;

  // Цена
  const price = card.querySelector('.popup__text--price');
  if (!data.offer.price) {
    price.remove();
  } else {
    price.innerHTML = `<p>${data.offer.price}<span>₽/ночь</span></p>`;
  }

  // Тип
  const offerLable = offerType[data.offer.type];
  card.querySelector('.popup__type').textContent = offerLable;

  // Количество комнат и гостей
  const guestRoom = card.querySelector('.popup__text--capacity');
  if (!data.offer.guests || !data.offer.rooms) {
    guestRoom.remove();
  } else {
    guestRoom.innerHTML = `<p>${data.offer.rooms} комнаты для ${data.offer.guests} гостей</p>`;
  }

  // Время выезда и заезда
  const timeCheckiAndCheckout = card.querySelector('.popup__text--time');
  if (!data.offer.checkin || !data.offer.checkout) {
    timeCheckiAndCheckout.remove();
  } else {
    timeCheckiAndCheckout.innerHTML = `<p>Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}</p>`;
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
  const photo = card.querySelector('.popup__photos');
  if (!data.offer.photos.length) {
    photo.remove();
  } else {
    photo.querySelector('.popup__photo').setAttribute('src', data.offer.photos[0]);
    for (let i = 1; data.offer.photos.length > photo.children.length; i++) {
      const newPhoto = photo.querySelector('.popup__photo').cloneNode(true);
      newPhoto.setAttribute('src', data.offer.photos[i]);
      photo.appendChild(newPhoto);
    }
  }

  // Аватарка
  const avatar = card.querySelector('.popup__avatar');
  avatar.setAttribute('src', data.author.avatar);
  avatar.onerror = function() {
    avatar.remove();
  };

  mapCanvas.appendChild(card);
}

export {
  generateCard
};
