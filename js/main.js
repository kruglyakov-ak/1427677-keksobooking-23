import {
  activateMapFilters,
  deactivateMapFilters
} from './map-filters.js';

import {
  activateForm,
  deactivateForm
} from './form.js';

import { addMap } from './map.js';
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
