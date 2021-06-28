import {
  addInputValidationIndicator
} from './util.js';

import {
  propertyOffer
} from './card.js';

const GUESTS_VALUE_MIN = 0;
const ROOMS_VALUE_MAX = 100;

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');

addInputValidationIndicator(titleInput);
addInputValidationIndicator(priceInput);

const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const errorText = 'Количество гостей не может превышать количества комнат;\n100 комнат — «не для гостей».';
const capacity = +capacitySelect.value;
const rooms = +roomNumberSelect.value;
const isRoomsInvalid = rooms !== ROOMS_VALUE_MAX && capacity === GUESTS_VALUE_MIN;
const isCapacityInvalid = rooms === ROOMS_VALUE_MAX && capacity !== GUESTS_VALUE_MIN;
const isCompareInvalid = rooms < capacity;
const isInvalid = isRoomsInvalid || isCapacityInvalid || isCompareInvalid;

const addCustomValidityErrorForCapacityAndRooms = (element) => {
  if (isInvalid) {
    element.setCustomValidity(errorText);
  } else {
    element.setCustomValidity('');
  }
};

addCustomValidityErrorForCapacityAndRooms(roomNumberSelect);
roomNumberSelect.addEventListener('change', (evt) => {
  addCustomValidityErrorForCapacityAndRooms(evt.target);
});
capacitySelect.addEventListener('change', (evt) => {
  addCustomValidityErrorForCapacityAndRooms(evt.target);
});

const typeSelect = document.querySelector('#type');

const setPriceDependingOnTheType = (select) => {
  const price = propertyOffer[select.value].price;
  priceInput.setAttribute('min', price);
  priceInput.setAttribute('placeholder', price);
};

setPriceDependingOnTheType(typeSelect);
typeSelect.addEventListener('change', (evt) => {
  setPriceDependingOnTheType(evt.target);
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
const addAddressFromMap = (address) => {
  addressInput.value = `${address.lat.toFixed(5)}, ${address.lng.toFixed(5)}`;
};

const resetButton = document.querySelector('.ad-form__reset');
const resetAddress = () => {

}

export {
  addAddressFromMap
};
