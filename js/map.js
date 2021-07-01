import {
  generatedAds
} from './data.js';

import {
  generateCard
} from './card.js';

import {
  setAddressValue,
  activateForm,
  deactivateForm,
  resetButton
} from './form.js';

import {
  activateMapFilters,
  deactivateMapFilters
} from './map-filters.js';

const START_COORDINATES = {
  lat: 35.681700,
  lng: 139.753891,
};
const START_ZOOM_LEVEL = 12;
const MAIN_PIN = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const AD_PIN = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

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
  .on('load', activatePage)
  .setView(START_COORDINATES, START_ZOOM_LEVEL);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPin = L.icon(MAIN_PIN);

const mainMarker = L.marker(
  START_COORDINATES,
  {
    draggable: true,
    icon: mainPin,
  },
);
mainMarker.addTo(map);
setAddressValue(START_COORDINATES);
mainMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();
  setAddressValue(address);
});

resetButton.addEventListener('click', () => {
  setAddressValue(START_COORDINATES);
  mainMarker.setLatLng(START_COORDINATES);
  map.setView(START_COORDINATES, START_ZOOM_LEVEL);
});

const adMarkerGroup = L.layerGroup().addTo(map);

const createAdMarkers = (ad) => {
  const adPin = L.icon(AD_PIN);

  const adMarker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: adPin,
    },
  );

  adMarker
    .addTo(adMarkerGroup)
    .bindPopup(
      generateCard(ad),
      {
        keepInView: true,
      },
    );
};

generatedAds.forEach((generatedAd) => {
  createAdMarkers(generatedAd);
});
