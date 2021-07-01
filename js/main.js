import {
  createAd,
  ADS_COUNT
} from './data.js';

import {
  createCard
} from './card.js';

import {
  activateMapFilters,
  deactivateMapFilters
} from './map-filters.js';

import {
  activateForm,
  deactivateForm
} from './form.js';

import {
  addMap,
  addMarkers
} from './map.js';

// Создание данных объявлений
const createAds = (count) => {
  const ads = [];
  while (ads.length < count) {
    ads.push(createAd());
  }
  return ads;
};
const adsData = createAds(ADS_COUNT);

// Функции активации страницы
const activatePage = () => {
  activateMapFilters();
  activateForm();
};

const deactivatePage = () => {
  deactivateMapFilters();
  deactivateForm();
};

// Управление картой
const loadMap = () => {
  const map = addMap(activatePage, deactivatePage);

  adsData.forEach((ad) => {
    const location = ad.location;
    const card = createCard(ad);
    addMarkers(map, location, card);
  });
};

loadMap();
