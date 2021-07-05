import {
  onPopupEscKeydown
} from './util.js';
const body = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;
const successMessage = successMessageTemplate.querySelector('.success');
const errorMessage = errorMessageTemplate.querySelector('.error');
const errorCloseButton = errorMessageTemplate.querySelector('.error__button');

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
  successMessage.remove();
};

const closeErrorMessage = () => {
  errorMessage.remove();
};


const openSuccessMessage = () => {
  body.appendChild(successMessage);
  closePopup(closeSuccessMessage);
};

const openErrorMessage = () => {
  body.appendChild(errorMessage);
  closePopup(closeErrorMessage, errorCloseButton);
};

export {
  openSuccessMessage,
  openErrorMessage
};
