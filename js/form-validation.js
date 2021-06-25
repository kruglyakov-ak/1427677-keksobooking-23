import {
  addInputValidationIndicator
} from './util.js';

const GUESTS_VALUE_MIN = 0;
const ROOMS_VALUE_MAX = 100;

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');

addInputValidationIndicator(titleInput);
addInputValidationIndicator(priceInput);

const roomNumberList = document.querySelector('#room_number');
const capacityList = document.querySelector('#capacity');
const errorText = 'Количество гостей не может превышать количества комнат;\n100 комнат — «не для гостей».';

const addRoomsAndCapacityListener = (element) => {
  const capacity = +capacityList.value;
  const rooms = +roomNumberList.value;
  if (rooms !== ROOMS_VALUE_MAX && capacity === GUESTS_VALUE_MIN) {
    element.setCustomValidity(errorText);
  } else if (rooms === ROOMS_VALUE_MAX && capacity !== GUESTS_VALUE_MIN) {
    roomNumberList.setCustomValidity(errorText);
  } else if (rooms < capacity) {
    element.setCustomValidity(errorText);
  } else {
    element.setCustomValidity('');
  }
};

addRoomsAndCapacityListener(roomNumberList);
roomNumberList.addEventListener('change', () => addRoomsAndCapacityListener());
capacityList.addEventListener('change', () => addRoomsAndCapacityListener());

const typeList = document.querySelector('#type');
const compareValues = (select) => {
  if (select.value === 'bungalow') {
    priceInput.setAttribute('min', 0);
    priceInput.setAttribute('placeholder', 0);
  } else if (select.value === 'flat') {
    priceInput.setAttribute('min', 1000);
    priceInput.setAttribute('placeholder', 1000);
  } else if (select.value === 'hotel') {
    priceInput.setAttribute('min', 3000);
    priceInput.setAttribute('placeholder', 3000);
  } else if (select.value === 'house') {
    priceInput.setAttribute('min', 5000);
    priceInput.setAttribute('placeholder', 5000);
  } else if (select.value === 'palace') {
    priceInput.setAttribute('min', 10000);
    priceInput.setAttribute('placeholder', 10000);
  }
};

compareValues(typeList);
typeList.addEventListener('change', (evt) => {
  compareValues(evt.target);
});

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

timein.addEventListener('change', (evt) => {
  timeout.value = evt.target.value;
});

timeout.addEventListener('change', (evt) => {
  timein.value = evt.target.value;
});
