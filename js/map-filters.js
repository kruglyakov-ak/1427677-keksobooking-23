import {
  enableFormElements,
  disableFormElements
} from './util.js';

import {
  renderAdsOnMap
} from './map.js';

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const NO_FILTER_VALUE = 'any';
const PRICE_SELECT_MIDDLE_VALUE = 'middle';
const PRICE_SELECT_LOW_VALUE = 'middle';
const PRICE_SELECT_HIGHT_VALUE = 'middle';

const mapFilters = document.querySelector('.map__filters');
const filtersFieldsets = mapFilters.querySelectorAll('fieldset');
const filtersSelects = mapFilters.querySelectorAll('select');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomsSelect = mapFilters.querySelector('#housing-rooms');
const guestsSelect = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelectorAll('.map__checkbox');

const activateMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const deactivateMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  disableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const filterByType = (ad) => {
  if (typeSelect.value === NO_FILTER_VALUE) {
    return false;
  } else {
    return ad.offer.type === typeSelect.value;
  }
};
const filterByRooms = (ad) => {
  if (typeSelect.value === NO_FILTER_VALUE) {
    return false;
  } else {
    return ad.offer.rooms === +roomsSelect.value;
  }
};
const filterByGuests = (ad) => {
  if (typeSelect.value === NO_FILTER_VALUE) {
    return false;
  } else {
    return ad.offer.guests === +guestsSelect.value;
  }
};
const filterByPrice = (ad) => {
  if (priceSelect.value === PRICE_SELECT_MIDDLE_VALUE) {
    return ad.offer.price >= LOW_PRICE && ad.offer.price <= HIGH_PRICE;
  } else if (priceSelect.value === PRICE_SELECT_LOW_VALUE) {
    return ad.offer.price <= LOW_PRICE;
  } else if (priceSelect.value === PRICE_SELECT_HIGHT_VALUE) {
    return ad.offer.price >= HIGH_PRICE;
  } else if (priceSelect.value === NO_FILTER_VALUE) {
    return false;
  }
};

const getFeaturesRank = (ad) => {
  const checkedHousingFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');
  let rank = 0;
  if (ad.offer.features) {
    checkedHousingFeatures.forEach((feature) => {
      if (ad.offer.features.includes(feature.value)) {
        rank += 1;
      } else {
        rank = -(housingFeatures.length);
      }
    });
  } else if (!checkedHousingFeatures.length) {
    rank = 0;
  }
  return rank;
};


const compareAds = (ad1, ad2) => {
  const rankA = getFeaturesRank(ad1);
  const rankB = getFeaturesRank(ad2);

  return rankB - rankA;
};

const filterMapMarkers = (data) => {
  mapFilters.addEventListener('change', (evt) => {
    const setFiltersChange = () => {
      const setFilter = (ad) => {
        if (evt.target.name === typeSelect.name) {
          return filterByType(ad);
        } else if (evt.target.name === roomsSelect.name) {
          return filterByRooms(ad);
        } else if (evt.target.name === guestsSelect.name) {
          return filterByGuests(ad);
        } else if (evt.target.name === priceSelect.name) {
          return filterByPrice(ad);
        }
      };
      const filteredData = data.filter((ad) => setFilter(ad));
      return filteredData;
    };
    renderAdsOnMap(setFiltersChange());
  });
};

const resetMapFilters = () => {
  if (mapFilters) {
    mapFilters.reset();
  }
};

export {
  activateMapFilters,
  deactivateMapFilters,
  compareAds,
  filterMapMarkers,
  getFeaturesRank,
  resetMapFilters
};
