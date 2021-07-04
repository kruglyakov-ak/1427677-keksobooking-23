import {
  activateMapFilters,
  deactivateMapFilters
} from './map-filters.js';

import {
  activateForm,
  deactivateForm,
  setFormSubmit
} from './form.js';

import { addMap } from './map.js';

import {
  openSuccessMessage,
  openErrorMessage
} from './popup-messages.js';
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

// Отправка данных формы объявления на сервер
setFormSubmit(openSuccessMessage, openErrorMessage);
