import {
  enableElements,
  disableElements
} from './util.js';

const mapFilters = document.querySelector('.map__filters');
const filtersFieldsets = mapFilters.querySelectorAll('fieldset');
const filtersSelects = mapFilters.querySelectorAll('select');

const activateMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableElements([...filtersFieldsets, ...filtersSelects]);
};

const deactivateMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  disableElements([...filtersFieldsets, ...filtersSelects]);
};

export {
  activateMapFilters,
  deactivateMapFilters
};
