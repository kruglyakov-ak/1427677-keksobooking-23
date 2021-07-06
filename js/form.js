import {
  enableFormElements,
  disableFormElements,
  addInputValidationIndicator
} from './util.js';

import { offerData } from './card.js';

import {
  map,
  resetMap,
  START_COORDINATES
} from './map.js';

import { getOrPostData } from './api.js';

import {
  openSuccessMessage,
  openErrorMessage
} from './popup-messages.js';

const GUESTS_VALUE_MIN = 0;
const ROOMS_VALUE_MAX = 100;
const ERROR_TEXT = 'Количество гостей не может превышать количества комнат;\n100 комнат — «не для гостей».';
const DIGITS_AFTER_POINT = 5;
const POST_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';

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
  const price = offerData[select.value].price;
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

const resetButton = document.querySelector('.ad-form__reset');
const resetForm = () => {
  form.reset();
  setPriceByType(typeSelect);
  validateCapacityAndRooms(roomNumberSelect);
  if (map) {
    setAddressValue(START_COORDINATES);
    resetMap();
  }
};
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  getOrPostData({
    url: POST_DATA_URL,
    method: 'POST',
    body: new FormData(evt.target),
    onSuccessCb: () => {
      openSuccessMessage();
      resetForm();
    },
    onErrorCb: openErrorMessage,
  });
});

export {
  activateForm,
  deactivateForm,
  setAddressValue,
  addressInput
};
