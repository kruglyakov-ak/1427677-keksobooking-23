import {
  addInputValidationIndicator
} from './util.js';

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');

const roomNumberList = document.querySelector('#room_number');
const capacityList = document.querySelector('#capacity');
const errorText = '1 комната — «для 1 гостя»;\n2 комнаты — «для 2 гостей» или «для 1 гостя»;\n3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;\n100 комнат — «не для гостей».';

const validateRoomNumber = () => {
  roomNumberList.addEventListener('change', (evt) => {
    if (+evt.target.value !== 100 && +capacityList.value === 0) {
      roomNumberList.setCustomValidity(errorText);
    } else if (+evt.target.value === 100 && +capacityList.value !== 0) {
      roomNumberList.setCustomValidity(errorText);
    } else if (+evt.target.value < +capacityList.value) {
      roomNumberList.setCustomValidity(errorText);
    } else {
      roomNumberList.setCustomValidity('');
    }
  });
};

const validateCapacity = () => {
  capacityList.addEventListener('change', (evt) => {
    if (+evt.target.value !== 0 && +roomNumberList.value === 100) {
      capacityList.setCustomValidity(errorText);
    } else if (+evt.target.value === 0 && +roomNumberList.value !== 100) {
      capacityList.setCustomValidity(errorText);
    } else if (+evt.target.value > +roomNumberList.value) {
      capacityList.setCustomValidity(errorText);
    } else {
      capacityList.setCustomValidity('');
    }
  });
};

const inputValidate = () => {
  addInputValidationIndicator(titleInput);
  addInputValidationIndicator(priceInput);
  validateRoomNumber();
  validateCapacity();
};


export {
  inputValidate
};
