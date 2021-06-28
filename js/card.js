const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');
const propertyOffer = {
  'palace': {
    label: 'Дворец',
    price: 10000,
  },
  'flat': {
    label: 'Квартира',
    price: 1000,
  },
  'bungalow': {
    label: 'Бунгало',
    price: 0,
  },
  'house': {
    label: 'Дом',
    price: 5000,
  },
  'hotel': {
    label: 'Отель',
    price: 3000,
  },
};

const generateCard = (data) => {
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
  const offerLabel = propertyOffer[data.offer.type].label;
  card.querySelector('.popup__type').textContent = offerLabel;

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
  const photos = card.querySelector('.popup__photos');
  if (!data.offer.photos.length) {
    photos.remove();
  } else {
    photos.innerHTML = '';
    data.offer.photos.forEach((photoSrc) => {
      photos.insertAdjacentHTML('afterend',
        `<img src=${photoSrc} class="popup__photo" alt="Фотография жилья" width="45" height="40"></img>`);
    });
  }

  // Аватарка
  const avatar = card.querySelector('.popup__avatar');
  if (!data.author.avatar.length) {
    avatar.remove();
  } else {
    avatar.setAttribute('src', data.author.avatar);
  }

  mapCanvas.appendChild(card);
};

export {
  generateCard,
  propertyOffer
};
