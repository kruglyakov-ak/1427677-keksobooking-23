import {
  enableFormElements,
  disableFormElements
} from './util.js';

const mapFilters = document.querySelector('.map__filters');
const filtersFieldsets = mapFilters.querySelectorAll('fieldset');
const filtersSelects = mapFilters.querySelectorAll('select');
const housingFeatures = mapFilters.querySelector('#housing-features');

const activateMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const deactivateMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  disableFormElements([...filtersFieldsets, ...filtersSelects]);
};


const getFeaturesRank = (ad) => {
  let rank = 0;

  if (ad.offer.features === housingFeatures.value) {
    rank += 1;
  }

  return rank;
};

const compareAds = (ad1, ad2) => {
  const rankA = getFeaturesRank(ad1);
  const rankB = getFeaturesRank(ad2);

  return rankB - rankA;
};

const setFiltersChange = (cb) => {
  housingFeatures.addEventListener('change', () => {
    cb();
  });
};

export {
  activateMapFilters,
  deactivateMapFilters,
  compareAds,
  setFiltersChange
};
