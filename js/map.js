import {
  activateMapFilters,
  deactivateMapFilters
} from './map-filters.js';

import {
  activateForm,
  deactivateForm
} from './form.js';

import {
  setAddressValue
} from './form-validation.js';

import {
  generatedAds
} from './data.js';

import {
  generateCard
} from './card.js';

const START_COORDINATES = {
  lat: 35.681700,
  lng: 139.753891,
};
const START_ZOOM_LEVEL = 12;

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
  .setView(START_COORDINATES, START_ZOOM_LEVEL);

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
  START_COORDINATES,
  {
    draggable: true,
    icon: mainPin,
  },
);
mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();
  setAddressValue(address);
});

const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng(START_COORDINATES);
  map.setView(START_COORDINATES, START_ZOOM_LEVEL);
});

const adMarkerGroup = L.layerGroup().addTo(map);

const createAdMarkers = (ad) => {
  const adIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const adMarker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: adIcon,
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
