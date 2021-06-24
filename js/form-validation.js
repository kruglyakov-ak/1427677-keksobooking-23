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
const roomNumberOptions = roomNumberList.querySelectorAll('option');
const capacityList = document.querySelector('#capacity');
const capacityOptions = capacityList.querySelectorAll('option');
const optionsValue = {
  oneRoom: '1',
  twoRooms: '2',
  threeRooms: '3',
  oneHundredRooms: '100',
  oneGuest: '1',
  twoGuests: '2',
  threeGuests: '3',
  noForGuest: '0',
};

const changeCapacityList = () => {
  capacityList.addEventListener('change', (evt) => {
    if (evt.target.value === optionsValue.oneGuest) {
      roomNumberOptions.forEach((option) => {
        if (option.value === optionsValue.oneRoom) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      });
    } else if (evt.target.value === optionsValue.twoGuests) {
      roomNumberOptions.forEach((option) => {
        if (option.value === optionsValue.oneRoom || option.value === optionsValue.twoRooms) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      });
    } else if (evt.target.value === optionsValue.threeGuests) {
      roomNumberOptions.forEach((option) => {
        if (option.value !== optionsValue.oneHundredRooms) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      });
    } else if (evt.target.value === optionsValue.noForGuest) {
      roomNumberOptions.forEach((option) => {
        if (option.value === optionsValue.oneHundredRooms) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      });
    } else {
      roomNumberOptions.forEach((option) => {
        option.disabled = false;
      });
    }
  });
};

const changeRoomNumberList = () => {
  roomNumberList.addEventListener('change', (evt) => {
    if (evt.target.value === optionsValue.oneRoom) {
      capacityOptions.forEach((option) => {
        if (option.value === optionsValue.oneGuest) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      });
    } else if (evt.target.value === optionsValue.twoRooms) {
      capacityOptions.forEach((option) => {
        if (option.value === optionsValue.oneGuest || option.value === optionsValue.twoGuests) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      });
    } else if (evt.target.value === optionsValue.threeRooms) {
      capacityOptions.forEach((option) => {
        if (option.value !== optionsValue.noForGuest) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      });
    } else if (evt.target.value === optionsValue.oneHundredRooms) {
      capacityOptions.forEach((option) => {
        if (option.value === optionsValue.noForGuest) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      });
    } else {
      capacityOptions.forEach((option) => {
        option.disabled = false;
      });
    }
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
