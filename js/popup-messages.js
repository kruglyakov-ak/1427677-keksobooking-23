import {
  isEscEvent
} from './util.js';
const body = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;
const successMessage = successMessageTemplate.querySelector('.success');
const errorMessage = errorMessageTemplate.querySelector('.error');
const errorCloseButton = errorMessageTemplate.querySelector('.error__button');

const onPopupSuccsessEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeSuccessMessage();
  }
};

const onPopupErrorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeErrorMessage();
  }
};

function closeSuccessMessage () {
  successMessage.remove();
  document.removeEventListener('keydown', onPopupSuccsessEscKeydown);
  document.removeEventListener('click', closeSuccessMessage);
}

function closeErrorMessage () {
  errorMessage.remove();
  document.removeEventListener('keydown', onPopupErrorEscKeydown);
}

const openSuccessMessage = () => {
  body.appendChild(successMessage);
  document.addEventListener('keydown', onPopupSuccsessEscKeydown);
  document.addEventListener('click', closeSuccessMessage);
};

const openErrorMessage = () => {
  body.appendChild(errorMessage);
  errorCloseButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onPopupErrorEscKeydown);
};

export {
  openSuccessMessage,
  openErrorMessage
};
