import {
  setAddressValue,
  addressInput
} from './form.js';
import { createCard } from './card.js';

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
const ADS_ON_MAP_COUNT = 10;
const map = L.map('map-canvas');
const mainPin = L.icon(MAIN_PIN);
const mainMarker = L.marker(
  START_COORDINATES,
  {
    draggable: true,
    icon: mainPin,
  },
);

const addMarkers = (location, card) => {
  const adMarkerGroup = L.layerGroup().addTo(map);
  const adPin = L.icon(AD_PIN);

  const adMarker = L.marker(
    location,
    {
      icon: adPin,
    },
  );

  adMarker
    .addTo(adMarkerGroup)
    .bindPopup(
      card,
      {
        keepInView: true,
      },
    );
};

const renderAdsOnMap = (data) => {
  if (data) {
    data.slice(0, ADS_ON_MAP_COUNT)
      .forEach((ad) => {
        const location = ad.location;
        const card = createCard(ad);
        addMarkers(location, card);
      });
  }
};

const addMap = (onLoadCallback) => {
  map.on('load', () => {
    onLoadCallback();
  })
    .setView(START_COORDINATES, START_ZOOM_LEVEL);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);

  if (addressInput) {
    setAddressValue(START_COORDINATES);
    mainMarker.on('moveend', (evt) => {
      const address = evt.target.getLatLng();
      setAddressValue(address);
    });
  }
};

const resetMap = () => {
  mainMarker.setLatLng(START_COORDINATES);
  map.setView(START_COORDINATES, START_ZOOM_LEVEL);
  map.closePopup();
};

export {
  START_COORDINATES,
  resetMap,
  addMap,
  map,
  renderAdsOnMap
};
