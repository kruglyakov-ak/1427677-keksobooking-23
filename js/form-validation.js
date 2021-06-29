import {
  addInputValidationIndicator
} from './util.js';

import {
  propertyOffer
} from './card.js';

const GUESTS_VALUE_MIN = 0;
const ROOMS_VALUE_MAX = 100;
const ERROR_TEXT = 'Количество гостей не может превышать количества комнат;\n100 комнат — «не для гостей».';

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
  addressInput.value = `${address.lat.toFixed(5)}, ${address.lng.toFixed(5)}`;
};

export {
  setAddressValue
};
