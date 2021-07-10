import {
  activateMapFilters,
  deactivateMapFilters,
  setFiltersChange,
  filterByType,
  filterByPrice,
  filterByRooms,
  filterByGuests
} from './map-filters.js';

import {
  activateForm,
  deactivateForm
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
    setFiltersChange(() => {
      renderAdsOnMap(filterByType(filterByPrice(filterByRooms(filterByGuests(data)))));
    });
  },
  onErrorCb: showAlert,
});
