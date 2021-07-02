import {
  getRandomNumberInRange,
  getArrayRandomElement,
  getRandomArrayLength,
  makeUniqueRandomIntegerGenerator
} from './util.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 10;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_LATITUDE = 35.65;
const MAX_LATITUDE = 35.7;
const MIN_LONGITUDE = 139.7;
const MAX_LONGITUDE = 139.8;
const ADS_COUNT = 10;
const offerData = {
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
const getUniqueRandomIntegerForUrlAvatar = makeUniqueRandomIntegerGenerator(1, ADS_COUNT);

const createAuthor = () => ({
  avatar: `img/avatars/user${getUniqueRandomIntegerForUrlAvatar().toString().padStart(2, '0')}.png`,
});

const createOffer = (lat, lng) => ({
  title: 'Милая, уютная квартира в центре Токио.',
  address: `${lat}, ${lng}`,
  price: getRandomNumberInRange(MIN_PRICE, MAX_PRICE),
  type: getArrayRandomElement(TYPES),
  rooms: getRandomNumberInRange(MIN_ROOMS, MAX_ROOMS),
  guests: getRandomNumberInRange(MIN_GUESTS, MAX_GUESTS),
  checkin: getArrayRandomElement(CHECKINS),
  checkout: getArrayRandomElement(CHECKOUTS),
  features: getRandomArrayLength(FEATURES),
  description: 'Самое лучшее жилье в городе!',
  photos: getRandomArrayLength(PHOTOS),
});

const createAd = () => {
  const lat = getRandomNumberInRange(MIN_LATITUDE, MAX_LATITUDE, 5);
  const lng = getRandomNumberInRange(MIN_LONGITUDE, MAX_LONGITUDE, 5);
  const ad = {
    author: createAuthor(),
    offer: createOffer(lat, lng),
    location: {
      lat: lat,
      lng: lng,
    },
  };
  return ad;
};

const createAds = () => {
  const ads = [];
  while (ads.length < ADS_COUNT) {
    ads.push(createAd());
  }
  return ads;
};

export {
  offerData,
  createAds
};
