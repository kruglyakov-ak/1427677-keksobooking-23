import {
  activateMapFilters,
  deactivateMapFilters
} from './map-filters.js';

import {
  activateForm,
  deactivateForm
} from './form.js';

import { fetchData } from './api.js';
import { showAlert } from './util.js';

import {
  addMap,
  renderAdsOnMap
} from './map.js';

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

// Добавление карты на страницу и активация формы объявления
addMap(activatePage);

//Получение данных с сервера
fetchData({
  url: 'https://23.javascript.pages.academy/keksobooking/data',
  onSuccessCb: renderAdsOnMap,
  onErrorCb: showAlert,
});
