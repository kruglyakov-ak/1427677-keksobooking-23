import {
  activateMapFilters,
  deactivateMapFilters,
  filterMapMarkers,
  resetMapFilter
} from './map-filters.js';

import {
  activateForm,
  deactivateForm,
  resetButton,
  form
} from './form.js';

import { getOrPostData } from './api.js';
import { showAlert } from './util.js';

import {
  addMap,
  renderAdsOnMap
} from './map.js';

const GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';

// Функции активации страницы
const deactivatePage = () => {
  deactivateMapFilters();
  deactivateForm();
};

deactivatePage();

// Добавление карты на страницу и активация формы объявления
addMap(activateForm);

//Получение данных с сервера
getOrPostData({
  url: GET_DATA_URL,
  onSuccessCb: (data) => {
    activateMapFilters();
    renderAdsOnMap(data);
    filterMapMarkers(data, renderAdsOnMap);
    resetButton.addEventListener('click', () => resetMapFilter(data, renderAdsOnMap));
    form.addEventListener('submit', () => resetMapFilter(data, renderAdsOnMap));
  },
  onErrorCb: showAlert,
});
