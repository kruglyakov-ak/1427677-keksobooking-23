import {
  activateMapFilters,
  deactivateMapFilters,
  filterMapMarkers,
  resetMapFilter,
  setChangeFilter
} from './map-filters.js';

import {
  activateForm,
  deactivateForm,
  resetButton,
  form
} from './form.js';

import { getOrPostData } from './api.js';
import {
  showAlert,
  debounce
} from './util.js';

import {
  addMap,
  renderAdsOnMap
} from './map.js';

const GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const RERENDER_DELAY = 500;
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
    setChangeFilter(debounce(
      () => renderAdsOnMap(filterMapMarkers(data)),
      RERENDER_DELAY,
    ));
    resetButton.addEventListener('click', () => resetMapFilter(data, renderAdsOnMap));
    form.addEventListener('submit', () => resetMapFilter(data, renderAdsOnMap));
  },
  onErrorCb: showAlert,
});
