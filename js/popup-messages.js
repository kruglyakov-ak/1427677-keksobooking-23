import {
  onPopupEscKeydown
} from './util.js';
const body = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;
const successMessage = successMessageTemplate.querySelector('.success');
const errorMessage = errorMessageTemplate.querySelector('.error');
const errorCloseButton = errorMessageTemplate.querySelector('.error__button');

body.appendChild(successMessage);
body.appendChild(errorMessage);
successMessage.classList.add('visually-hidden');
errorMessage.classList.add('visually-hidden');

const closePopup = (closeCallback, button) => {
  document.addEventListener('keydown', (evt) => {
    onPopupEscKeydown(closeCallback, evt);
  });
  document.addEventListener('click', closeCallback);
  if (button) {
    button.addEventListener('click', closeCallback);
  }
};

const closeSuccessMessage = () => {
  successMessage.classList.add('visually-hidden');
};

const closeErrorMessage = () => {
  errorMessage.classList.add('visually-hidden');
};


const openSuccessMessage = () => {
  successMessage.classList.remove('visually-hidden');
  closePopup(closeSuccessMessage);
};

const openErrorMessage = () => {
  errorMessage.classList.remove('visually-hidden');
  closePopup(closeErrorMessage, errorCloseButton);
};

export {
  openSuccessMessage,
  openErrorMessage
};
