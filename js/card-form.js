import {
  enableElements,
  disableElements
} from './util.js';

const cardForm = document.querySelector('.ad-form');
const formFieldsets = cardForm.querySelectorAll('fieldset');

const activateCardForm = () => {
  cardForm.classList.remove('ad-form--disabled');
  enableElements(formFieldsets);
};

const deactivateCardForm = () => {
  cardForm.classList.add('ad-form--disabled');
  disableElements(formFieldsets);
};

export {
  activateCardForm,
  deactivateCardForm
};
