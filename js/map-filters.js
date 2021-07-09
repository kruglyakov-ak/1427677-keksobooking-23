import {
  enableFormElements,
  disableFormElements
} from './util.js';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const mapFilters = document.querySelector('.map__filters');
const filtersFieldsets = mapFilters.querySelectorAll('fieldset');
const filtersSelects = mapFilters.querySelectorAll('select');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomsSelect = mapFilters.querySelector('#housing-rooms');
const guestSelect = mapFilters.querySelector('#housing-guests');


const activateMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const deactivateMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  disableFormElements([...filtersFieldsets, ...filtersSelects]);
};

const filterByType = (data) => {
  if (typeSelect.value === 'any') {
    return data;
  } else {
    const filteredData = data.filter((ad) => ad.offer.type === typeSelect.value);
    return filteredData;
  }
};

const filterByPrice = (data) => {
  if (priceSelect.value === 'any') {
    return data;
  } else if (priceSelect.value === 'middle') {
    const filteredData = data.filter((ad) => ad.offer.price >= LOW_PRICE && ad.offer.price <= HIGH_PRICE);
    return filteredData;
  } else if (priceSelect.value === 'low') {
    const filteredData = data.filter((ad) => ad.offer.price <= LOW_PRICE);
    return filteredData;
  } else if (priceSelect.value === 'high') {
    const filteredData = data.filter((ad) => ad.offer.price >= HIGH_PRICE);
    return filteredData;
  }
};

const filterByRooms = (data) => {
  if (roomsSelect.value === 'any') {
    return data;
  } else {
    const filteredData = data.filter((ad) => ad.offer.rooms === +roomsSelect.value);
    return filteredData;
  }
};

const filterByGuests = (data) => {
  if (guestSelect.value === 'any') {
    return data;
  } else {
    const filteredData = data.filter((ad) => ad.offer.guests === +guestSelect.value);
    return filteredData;
  }
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
  getFeaturesRank,
  setFiltersChange,
  filterByType
};
