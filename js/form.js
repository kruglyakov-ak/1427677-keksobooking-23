import {
  enableFormElements,
  disableFormElements
} from './util.js';

import {
  inputValidate,
  selectSynch
} from './form-validation.js';


const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  enableFormElements(formFieldsets);
};

const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  disableFormElements(formFieldsets);
};

const formValidate = () => {
  inputValidate();
  selectSynch();
};

export {
  activateForm,
  deactivateForm,
  formValidate
};
