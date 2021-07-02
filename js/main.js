import { createAds } from './data.js';

import {
  activateMapFilters,
  deactivateMapFilters
} from './map-filters.js';

import {
  activateForm,
  deactivateForm
} from './form.js';

import { addMap } from './map.js';

// Создание данных объявлений
const adsData = createAds();

// Функции активации страницы
const activatePage = () => {
  activateMapFilters();
  activateForm();
};

const deactivatePage = () => {
  deactivateMapFilters();
  deactivateForm();
};

deactivatePage();

// Управление картой
addMap(adsData, activatePage);
