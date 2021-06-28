import {
  activateMapFilters,
  deactivateMapFilters
} from './map-filters.js';

import {
  activateForm,
  deactivateForm
} from './form.js';

import {
  addAddressFromMap
} from './form-validation.js';

const COORDINATES = {
  lat: 35.681700,
  lng: 139.753891,
};
const ZOOM_LEVEL = 10;

const activatePage = () => {
  activateMapFilters();
  activateForm();
};

const deactivatePage = () => {
  deactivateMapFilters();
  deactivateForm();
};

deactivatePage();

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
  })
  .setView({
    lat: COORDINATES.lat,
    lng: COORDINATES.lng,
  }, ZOOM_LEVEL);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPin = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

const mainMarker = L.marker(
  {
    lat: COORDINATES.lat,
    lng: COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPin,
  },
);
mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();
  addAddressFromMap(address);
});

const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: COORDINATES.lat,
    lng: COORDINATES.lng,
  });

  map.setView({
    lat: COORDINATES.lat,
    lng: COORDINATES.lng,
  }, ZOOM_LEVEL);
});
