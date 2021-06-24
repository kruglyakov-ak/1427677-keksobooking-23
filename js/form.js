import {
  enableFormElements,
  disableFormElements
} from './util.js';

import {
  inputValidate
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
};

export {
  activateForm,
  deactivateForm,
  formValidate
};
