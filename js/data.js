import {getRandomNumberInRange, getArrayRandomElement, getArrayRandomLength} from './util.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MIN_PRICE = 10000;
const MAX_PRICE = 10000000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 10;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_LATITUDE = 35.65;
const MAX_LATITUDE = 35.7;
const MIN_LONGITUDE = 139.7;
const MAX_LONGITUDE = 139.8;
const ARRAYS_COUNT = 10;

function createNewAuthor(i) {
  return {
    avatar: `img/avatars/user${i.toString().padStart(2, '0')}.png`,
  };
}

function createNewOffer(lat, lng) {
  return {
    title: 'Милая, уютная квартира в центре Токио.',
    address: `${lat}, ${lng}`,
    price: getRandomNumberInRange(MIN_PRICE, MAX_PRICE),
    type: getArrayRandomElement(TYPES),
    rooms: getRandomNumberInRange(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomNumberInRange(MIN_GUESTS, MAX_GUESTS),
    checkin: getArrayRandomElement(CHECKINS),
    checkout: getArrayRandomElement(CHECKOUTS),
    features: getArrayRandomLength(FEATURES),
    description: 'Самое лучшее жилье в городе!',
    photos: getArrayRandomLength(PHOTOS),
  };
}

function createNewAd(int) {
  const lat = getRandomNumberInRange(MIN_LATITUDE, MAX_LATITUDE, 5);
  const lng = getRandomNumberInRange(MIN_LONGITUDE, MAX_LONGITUDE, 5);
  const ad = {
    author: createNewAuthor(int),
    offer: createNewOffer(lat, lng),
    location: {
      lat: lat,
      lng: lng,
    },
  };
  return ad;
}

function getNewArrayAds(count) {
  const newArrayAds = [];
  let i = 1;
  while (i <= count) {
    newArrayAds.push(createNewAd(i));
    i++;
  }
  return newArrayAds;
}

const datasAds = getNewArrayAds(ARRAYS_COUNT);

export {datasAds};
