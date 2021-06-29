import {
  enableFormElements,
  disableFormElements,
  addInputValidationIndicator
} from './util.js';

import {
  propertyOffer
} from './card.js';

import {
  START_COORDINATES,
  START_ZOOM_LEVEL,
  mainMarker,
  map
} from './map.js';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  enableFormElements(formFieldsets);
};

const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  disableFormElements(formFieldsets);
};

const GUESTS_VALUE_MIN = 0;
const ROOMS_VALUE_MAX = 100;
const ERROR_TEXT = 'Количество гостей не может превышать количества комнат;\n100 комнат — «не для гостей».';
const DIGITS_AFTER_POINT = 5;

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');

addInputValidationIndicator(titleInput);
addInputValidationIndicator(priceInput);

const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

const validateCapacityAndRooms = (element) => {
  const capacity = +capacitySelect.value;
  const rooms = +roomNumberSelect.value;
  const isRoomsInvalid = rooms !== ROOMS_VALUE_MAX && capacity === GUESTS_VALUE_MIN;
  const isCapacityInvalid = rooms === ROOMS_VALUE_MAX && capacity !== GUESTS_VALUE_MIN;
  const isCompareInvalid = rooms < capacity;
  const isInvalid = isRoomsInvalid || isCapacityInvalid || isCompareInvalid;
  if (isInvalid) {
    element.setCustomValidity(ERROR_TEXT);
  } else {
    element.setCustomValidity('');
  }
};

validateCapacityAndRooms(roomNumberSelect);
roomNumberSelect.addEventListener('change', (evt) => {
  validateCapacityAndRooms(evt.target);
});
capacitySelect.addEventListener('change', (evt) => {
  validateCapacityAndRooms(evt.target);
});

const typeSelect = document.querySelector('#type');

const setPriceByType = (select) => {
  const price = propertyOffer[select.value].price;
  priceInput.setAttribute('min', price);
  priceInput.setAttribute('placeholder', price);
};

setPriceByType(typeSelect);
typeSelect.addEventListener('change', (evt) => {
  setPriceByType(evt.target);
});

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

timein.addEventListener('change', (evt) => {
  timeout.value = evt.target.value;
});

timeout.addEventListener('change', (evt) => {
  timein.value = evt.target.value;
});

const addressInput = document.querySelector('#address');
addressInput.setAttribute('readonly', '');
const setAddressValue = (address) => {
  addressInput.value = `${address.lat.toFixed(DIGITS_AFTER_POINT)}, ${address.lng.toFixed(DIGITS_AFTER_POINT)}`;
};
setAddressValue(START_COORDINATES);

const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  setAddressValue(START_COORDINATES);
  setPriceByType(typeSelect);
  validateCapacityAndRooms(roomNumberSelect);
  mainMarker.setLatLng(START_COORDINATES);
  map.setView(START_COORDINATES, START_ZOOM_LEVEL);
});

export {
  activateForm,
  deactivateForm,
  setAddressValue
};
