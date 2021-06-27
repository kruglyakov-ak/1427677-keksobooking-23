import {
  addInputValidationIndicator
} from './util.js';

const GUESTS_VALUE_MIN = 0;
const ROOMS_VALUE_MAX = 100;
const BUNGALOW_PRICE = 0;
const FLAT_PRICE = 1000;
const HOTEL_PRICE = 3000;
const HOUSE_PRICE = 5000;
const PALACE_PRICE = 10000;

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');

addInputValidationIndicator(titleInput);
addInputValidationIndicator(priceInput);

const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const errorText = 'Количество гостей не может превышать количества комнат;\n100 комнат — «не для гостей».';

const addCustomValidityErrorForCapacityAndRooms = (element) => {
  const capacity = +capacitySelect.value;
  const rooms = +roomNumberSelect.value;
  if (rooms !== ROOMS_VALUE_MAX && capacity === GUESTS_VALUE_MIN) {
    element.setCustomValidity(errorText);
  } else if (rooms === ROOMS_VALUE_MAX && capacity !== GUESTS_VALUE_MIN) {
    element.setCustomValidity(errorText);
  } else if (rooms < capacity) {
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

const setAttributeForPriceInput = (price) => {
  priceInput.setAttribute('min', price);
  priceInput.setAttribute('placeholder', price);
};

const typeSelect = document.querySelector('#type');
const setPriceDependingOnTheType = (select) => {
  if (select.value === 'bungalow') {
    setAttributeForPriceInput(BUNGALOW_PRICE);
  } else if (select.value === 'flat') {
    setAttributeForPriceInput(FLAT_PRICE);
  } else if (select.value === 'hotel') {
    setAttributeForPriceInput(HOTEL_PRICE);
  } else if (select.value === 'house') {
    setAttributeForPriceInput(HOUSE_PRICE);
  } else if (select.value === 'palace') {
    setAttributeForPriceInput(PALACE_PRICE);
  }
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
