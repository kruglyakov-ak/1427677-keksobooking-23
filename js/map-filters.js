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
const FILTERED_ADS_COUNT = 10;

const mapFiltersForm = document.querySelector('.map__filters');
const filtersFieldsets = mapFiltersForm.querySelectorAll('fieldset');
const filtersSelects = mapFiltersForm.querySelectorAll('select');
const typeSelect = mapFiltersForm.querySelector('#housing-type');
const priceSelect = mapFiltersForm.querySelector('#housing-price');
const roomsSelect = mapFiltersForm.querySelector('#housing-rooms');
const guestsSelect = mapFiltersForm.querySelector('#housing-guests');
let sourseData = [];
const activateMapFiltersForm = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
  enableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const deactivateMapFiltersForm = () => {
  mapFiltersForm.classList.add('map__filters--disabled');
  disableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const setSourseData = (data) => {
  sourseData = data;
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
  const housingFeatures = mapFiltersForm.querySelectorAll('.map__checkbox:checked');
  const housingFeatureValues = Array.from(housingFeatures).map((element) => element.value);
  if (ad.offer.features) {
    return housingFeatureValues.every((feature) => ad.offer.features.includes(feature));
  } else {
    return true;
  }
};

const filterAds = () => {
  const filteredData = [];
  for (let i = 0; filteredData.length < FILTERED_ADS_COUNT && i < sourseData.length; i++) {
    const isTypeMatch = typeSelect.value === DEFAULT_FILTER_VALUE ||
      sourseData[i].offer.type === typeSelect.value;

    const isRoomsMatch = roomsSelect.value === DEFAULT_FILTER_VALUE ||
      sourseData[i].offer.rooms === +roomsSelect.value;

    const isGuestsMatch = guestsSelect.value === DEFAULT_FILTER_VALUE ||
      sourseData[i].offer.guests === +guestsSelect.value;

    const isPriceMatch = compareByPrice(sourseData[i]);
    const isFeaturesMatch = compareByFeatures(sourseData[i]);
    if (isTypeMatch && isRoomsMatch && isGuestsMatch && isPriceMatch && isFeaturesMatch) {
      filteredData.push(sourseData[i]);
    }
  }
  return filteredData;
};

const onChangeFilter = debounce(() => renderAdsOnMap(filterAds()));

mapFiltersForm.addEventListener('change', onChangeFilter);


const resetMapFilterForm = () => {
  mapFiltersForm.reset();
  renderAdsOnMap(filterAds(sourseData));
};

export {
  activateMapFiltersForm,
  deactivateMapFiltersForm,
  filterAds,
  resetMapFilterForm,
  setSourseData
};
