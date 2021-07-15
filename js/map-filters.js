import {
  enableFormElements,
  disableFormElements,
  debounce
} from './util.js';

import { renderAdsOnMap } from './map.js';

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const DEFAULT_FILTER_VALUE = 'any';
const PRICE_SELECT_MIDDLE_VALUE = 'middle';
const PRICE_SELECT_LOW_VALUE = 'low';
const PRICE_SELECT_HIGHT_VALUE = 'high';

const mapFilters = document.querySelector('.map__filters');
const filtersFieldsets = mapFilters.querySelectorAll('fieldset');
const filtersSelects = mapFilters.querySelectorAll('select');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomsSelect = mapFilters.querySelector('#housing-rooms');
const guestsSelect = mapFilters.querySelector('#housing-guests');
let sourseData = [];
const activateMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const deactivateMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  disableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const setSourseData = (data) => {
  sourseData = data;
  return sourseData;
};

const compareByPrice = (ad) => {
  switch (priceSelect.value) {
    case PRICE_SELECT_MIDDLE_VALUE:
      return ad.offer.price >= LOW_PRICE && ad.offer.price <= HIGH_PRICE;
    case PRICE_SELECT_LOW_VALUE:
      return ad.offer.price <= LOW_PRICE;
    case PRICE_SELECT_HIGHT_VALUE:
      return ad.offer.price >= HIGH_PRICE;
    case DEFAULT_FILTER_VALUE:
      return true;
  }
};

const compareByFeatures = (ad) => {
  const housingFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');
  const housingFeatureValues = Array.from(housingFeatures).map((element) => element.value);
  if (ad.offer.features) {
    return housingFeatureValues.every((feature) => ad.offer.features.includes(feature));
  }
};

const filterAds = () => sourseData.filter((ad) => {
  const isTypeMatch = typeSelect.value === DEFAULT_FILTER_VALUE ? true : ad.offer.type === typeSelect.value;
  const isRoomsMatch = roomsSelect.value === DEFAULT_FILTER_VALUE ? true : ad.offer.rooms === +roomsSelect.value;
  const isGuestsMatch = guestsSelect.value === DEFAULT_FILTER_VALUE ? true : ad.offer.guests === +guestsSelect.value;
  const isPriceMatch = compareByPrice(ad);
  const isFeaturesMatch = compareByFeatures(ad);
  return isTypeMatch && isRoomsMatch && isGuestsMatch && isPriceMatch && isFeaturesMatch;
});

const onChangeFilter = debounce(() => renderAdsOnMap(filterAds()));

mapFilters.addEventListener('change', onChangeFilter);


const resetMapFilter = () => {
  mapFilters.reset();
  renderAdsOnMap(filterAds(sourseData));
};

export {
  activateMapFilters,
  deactivateMapFilters,
  filterAds,
  resetMapFilter,
  setSourseData
};
