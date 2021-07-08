import {
  enableFormElements,
  disableFormElements
} from './util.js';

const mapFilters = document.querySelector('.map__filters');
const filtersFieldsets = mapFilters.querySelectorAll('fieldset');
const filtersSelects = mapFilters.querySelectorAll('select');
// const typeSelect = mapFilters.querySelector('#housing-type');
// const roomsSelect = mapFilters.querySelector('#housing-rooms');

const activateMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const deactivateMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  disableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const getFeaturesRank = (ad) => {
  const housingFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');
  let rank = 0;
  if (ad.offer.features) {
    housingFeatures.forEach((feature) => {
      if (ad.offer.features.includes(feature.value)) {
        rank += 1;
      } else {
        rank = 0;
      }
    });
  }
  return rank;
};

const compareAds = (ad1, ad2) => {
  const rankA = getFeaturesRank(ad1);
  const rankB = getFeaturesRank(ad2);

  return rankB - rankA;
};

const setFiltersChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

export {
  activateMapFilters,
  deactivateMapFilters,
  compareAds,
  setFiltersChange
};
