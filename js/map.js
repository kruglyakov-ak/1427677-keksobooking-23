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
const map = L.map('map-canvas');
const mainPin = L.icon(MAIN_PIN);
const mainMarker = L.marker(
  START_COORDINATES,
  {
    draggable: true,
    icon: mainPin,
  },
);
const ALERT_SHOW_TIME = 5000;
const ERROR_MASSAGE = 'Не удалось загрузить данные объявлений с сервера';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '150px';
  alertContainer.style.top = '200px';
  alertContainer.style.right = '150px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

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

const addMap = (onLoadCallback, data) => {
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
  if (data) {
    data.forEach((ad) => {
      const location = ad.location;
      const card = createCard(ad);
      addMarkers(location, card);
    });
  } else {
    showAlert(ERROR_MASSAGE);
  }
};

const resetMap = () => {
  mainMarker.setLatLng(START_COORDINATES);
  map.setView(START_COORDINATES, START_ZOOM_LEVEL);
};

export {
  START_COORDINATES,
  resetMap,
  addMap,
  map
};
