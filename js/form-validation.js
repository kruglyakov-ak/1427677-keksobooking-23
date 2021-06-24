import {
  addInputValidationIndicator
} from './util.js';


const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');

const inputValidate = () => {
  addInputValidationIndicator(titleInput);
  addInputValidationIndicator(priceInput);
};

const roomNumberList = document.querySelector('#room_number');
const rosomNumberOptions = roomNumberList.querySelectorAll('option');
const capacityList = document.querySelector('#capacity');
const capacityOptions = capacityList.querySelectorAll('option');

const changeRoomNumberList = () => {
  roomNumberList.addEventListener('change', (evt) => {
    capacityOptions.forEach((option) => {
      if (+evt.target.value === 100) {
        if (+option.value !== 0) {
          option.disabled = true;
        }
      } else if (+option.value > +evt.target.value || +option.value === 0) {
        option.disabled = true;
      }
    });
  });
};


const changeCapacityList = () => {
  capacityList.addEventListener('change', (evt) => {
    rosomNumberOptions.forEach((option) => {
      if (+evt.target.value === 0) {
        if (+option.value !== 100) {
          option.disabled = true;
        }
      } else if (+option.value > +evt.target.value || +option.value === 0) {
        option.disabled = true;
      }
    });
  });
};

const selectSynch = () => {
  changeRoomNumberList();
  changeCapacityList();
};

export {
  inputValidate,
  selectSynch
};
