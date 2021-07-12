import {
  enableFormElements,
  disableFormElements,
  getValues
} from './util.js';

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

const activateMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const deactivateMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  disableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const compareByType = (ad) => {
  if (ad.offer.type) {
    if (typeSelect.value === DEFAULT_FILTER_VALUE) {
      return true;
    } else {
      return ad.offer.type === typeSelect.value;
    }
  }
};

const compareByRooms = (ad) => {
  if (ad.offer.rooms) {
    if (roomsSelect.value === DEFAULT_FILTER_VALUE) {
      return true;
    } else {
      return ad.offer.rooms === +roomsSelect.value;
    }
  }
};

const compareByGuests = (ad) => {
  if (ad.offer.guests) {
    if (guestsSelect.value === DEFAULT_FILTER_VALUE) {
      return true;
    } else {
      return ad.offer.guests === +guestsSelect.value;
    }
  }
};

const compareByPrice = (ad) => {
  if (ad.offer.price) {
    if (priceSelect.value === PRICE_SELECT_MIDDLE_VALUE) {
      return ad.offer.price >= LOW_PRICE && ad.offer.price <= HIGH_PRICE;
    } else if (priceSelect.value === PRICE_SELECT_LOW_VALUE) {
      return ad.offer.price <= LOW_PRICE;
    } else if (priceSelect.value === PRICE_SELECT_HIGHT_VALUE) {
      return ad.offer.price >= HIGH_PRICE;
    } else if (priceSelect.value === DEFAULT_FILTER_VALUE) {
      return true;
    }
  }
};

const compareByFeatures = (ad) => {
  const housingFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');
  const housingFeatureValues = getValues(housingFeatures);
  const isTrueArr = [];
  if (!housingFeatures.length) {
    return true;
  } else if (ad.offer.features) {
    housingFeatureValues.forEach((feature) => {
      if (ad.offer.features.includes(feature)) {
        isTrueArr.push(true);
      }
    });
    return isTrueArr.length === housingFeatureValues.length;
  }
};

const filterMapMarkers = (data) => {
  const filteredData = data.filter((ad) => {
    const isTypeMatch = compareByType(ad);
    const isRoomsMatch = compareByRooms(ad);
    const isGuestsMatch = compareByGuests(ad);
    const isPriceMatch = compareByPrice(ad);
    const isFeaturesMatch = compareByFeatures(ad);
    return isTypeMatch && isRoomsMatch && isGuestsMatch && isPriceMatch && isFeaturesMatch;
  });
  return filteredData;
};

const setChangeFilter = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

const resetMapFilter = (data, cb) => {
  mapFilters.reset();
  cb(data);
};

export {
  activateMapFilters,
  deactivateMapFilters,
  filterMapMarkers,
  resetMapFilter,
  setChangeFilter
};
