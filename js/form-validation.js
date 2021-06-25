import {
  addInputValidationIndicator
} from './util.js';

const GUESTS_VALUE_MIN = 0;
const ROOMS_VALUE_MAX = 100;

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');

const roomNumberList = document.querySelector('#room_number');
const capacityList = document.querySelector('#capacity');
const errorText = 'Количество гостей не может превышать количества комнат;\n100 комнат — «не для гостей».';

const validateCapacity = () => {
  roomNumberList.addEventListener('change', () => {
    const capacity = +capacityList.value;
    const rooms = +roomNumberList.value;
    if (rooms !== ROOMS_VALUE_MAX && capacity === GUESTS_VALUE_MIN) {
      roomNumberList.setCustomValidity(errorText);
    } else if (rooms === ROOMS_VALUE_MAX && capacity !== GUESTS_VALUE_MIN) {
      roomNumberList.setCustomValidity(errorText);
    } else if (rooms < capacity) {
      roomNumberList.setCustomValidity(errorText);
    } else {
      roomNumberList.setCustomValidity('');
    }
  });
  capacityList.addEventListener('change', () => {
    const capacity = +capacityList.value;
    const rooms = +roomNumberList.value;
    if (capacity !== GUESTS_VALUE_MIN && rooms === ROOMS_VALUE_MAX) {
      capacityList.setCustomValidity(errorText);
    } else if (capacity === GUESTS_VALUE_MIN && rooms !== ROOMS_VALUE_MAX) {
      capacityList.setCustomValidity(errorText);
    } else if (capacity > rooms) {
      capacityList.setCustomValidity(errorText);
    } else {
      capacityList.setCustomValidity('');
    }
  });
};

const validateInput = () => {
  addInputValidationIndicator(titleInput);
  addInputValidationIndicator(priceInput);
  validateCapacity();
};

export {
  validateInput
};
