function getRandomNumberInRange (min = 0, max = 1, numberSymbolsAfterComma = 0) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const randomNumber = Math.random() * (upper - lower) + lower;
  return +randomNumber.toFixed(numberSymbolsAfterComma);
}

const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];


function getArrayRandomElement (array) {
  return array[getRandomNumberInRange(0, array.length - 1)];
}

function getArrayRandomLength (array) {
  array = array.slice(0, getRandomNumberInRange(1, array.length - 1, 0));
  return array;
}

function createNewAuthor (index) {
  return {avatar: `img/avatars/user${  index }.png`};
}

function createNewOffer (lat, lng) {
  return {
    title: 'Милая, уютная квартира в центре Токио.',
    address: `${lat  }, ${  lng}`,
    price: getRandomNumberInRange(10000, 10000000),
    type: getArrayRandomElement(TYPE),
    rooms: getRandomNumberInRange(1, 10),
    guests: getRandomNumberInRange(1, 10),
    checkin: getArrayRandomElement(CHECKIN),
    checkout: getArrayRandomElement(CHECKOUT),
    features: getArrayRandomLength (FEATURES),
    description: 'Самое лучшее жилье в городе!',
    photos: getArrayRandomLength (PHOTOS),
  };
}

function createNewAd (int) {
  const lat = getRandomNumberInRange(35.65, 35.7, 5);
  const lng = getRandomNumberInRange(139.7, 139.8, 5);
  const ad = {
    author: createNewAuthor (int),
    offer: createNewOffer(lat, lng),
    location: {lat: lat, lng: lng},
  };

  return ad;
}

function getNewArrayAds (count) {
  const newArrayAds = [];
  let int = 1;
  while(int <= count) {
    newArrayAds.push(createNewAd (int));
    int++;
  }
  return newArrayAds;
}

getNewArrayAds (10);


