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
addMap(activatePage);

setFormSubmit(openSuccessMessage, openErrorMessage);
