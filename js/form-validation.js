import {
  addInputValidationIndicator
} from './util.js';

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');

const inputValidate = () => {
  addInputValidationIndicator(titleInput);
  addInputValidationIndicator(priceInput);
};

const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

const selectSynch = () => {
  roomNumberSelect.addEventListener('change', (evt) => {
    capacitySelect.value = evt.target.value;
    if (evt.target.value === '100') {
      capacitySelect.value = '0';
    }
  });
  capacitySelect.addEventListener('change', (evt) => {
    roomNumberSelect.value = evt.target.value;
    if (evt.target.value === '0') {
      roomNumberSelect.value = '100';
    }
  });
};

export {
  inputValidate,
  selectSynch
};
