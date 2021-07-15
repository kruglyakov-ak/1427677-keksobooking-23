import {
  activateMapFiltersForm,
  deactivateMapFiltersForm,
  filterAds,
  resetMapFilterForm,
  setSourseData
} from './map-filters.js';

import {
  activateForm,
  deactivateForm,
  resetButton,
  form,
  resetForm
} from './form.js';

import { createRequest } from './api.js';
import { showAlert } from './util.js';

import {
  resetMap,
  addMap,
  map,
  renderAdsOnMap
} from './map.js';

import {
  openSuccessMessage,
  openErrorMessage
} from './popup-messages.js';

const GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';

// Функции активации страницы
const deactivatePage = () => {
  deactivateMapFiltersForm();
  deactivateForm();
};

deactivatePage();

// Добавление карты на страницу и активация формы объявления
addMap(activateForm);

//Получение данных с сервера, отправка формы на сервер, сброс формы, фильтров и карты
const onFormSubmitSuccess = () => {
  openSuccessMessage();
  resetForm();
  resetMap();
  resetMapFilterForm();
};

const onDataLoadSuccess = (data) => {
  setSourseData(data);
  activateMapFiltersForm();
  renderAdsOnMap(filterAds());

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    if (map) {
      resetMap();
      resetMapFilterForm();
    }
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createRequest({
      url: POST_DATA_URL,
      method: 'POST',
      body: new FormData(evt.target),
      onSuccessCb: onFormSubmitSuccess,
      onErrorCb: openErrorMessage,
    });
  });
};

createRequest({
  url: GET_DATA_URL,
  onSuccessCb: onDataLoadSuccess,
  onErrorCb: showAlert,
});
