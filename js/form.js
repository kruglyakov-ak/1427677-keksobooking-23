import {
  enableFormElements,
  disableFormElements,
  addInputValidationIndicator,
  clearInputValidationIndicator
} from './util.js';

import { offerData } from './card.js';

import {
  resetFileCooserPreview
} from './file-chooser-api.js';

const GUESTS_VALUE_MIN = 0;
const ROOMS_VALUE_MAX = 100;
const ERROR_TEXT = 'Количество гостей не может превышать количества комнат;\n100 комнат — «не для гостей».';
const DIGITS_AFTER_POINT = 5;

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

const validateCapacityAndRooms = () => {
  const capacityValue = +capacitySelect.value;
  const roomsValue = +roomNumberSelect.value;
  const isRoomsInvalid = roomsValue !== ROOMS_VALUE_MAX && capacityValue === GUESTS_VALUE_MIN;
  const isCapacityInvalid = roomsValue === ROOMS_VALUE_MAX && capacityValue !== GUESTS_VALUE_MIN;
  const isCompareInvalid = roomsValue < capacityValue;
  const isInvalid = isRoomsInvalid || isCapacityInvalid || isCompareInvalid;
  if (isInvalid) {
    roomNumberSelect.setCustomValidity(ERROR_TEXT);
    capacitySelect.setCustomValidity(ERROR_TEXT);
  } else {
    roomNumberSelect.setCustomValidity('');
    capacitySelect.setCustomValidity('');
  }
};

validateCapacityAndRooms();
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
  validateCapacityAndRooms();
  resetFileCooserPreview();
  clearInputValidationIndicator(titleInput);
  clearInputValidationIndicator(priceInput);
};

export {
  activateForm,
  deactivateForm,
  setAddressValue,
  addressInput,
  resetButton,
  form,
  resetForm
};
