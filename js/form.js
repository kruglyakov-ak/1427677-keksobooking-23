function diactivateForm(form, filters) {
  form.classList.add('ad-form--disabled');
  const fieldsetsForm = form.querySelectorAll('fieldset');
  fieldsetsForm.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  filters.classList.add('map__filters--disabled');
  const fieldsetsFilters = filters.querySelectorAll('fieldset');
  fieldsetsFilters.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  const selectsFilters = filters.querySelectorAll('select');
  selectsFilters.forEach((select) => {
    select.disabled = true;
  });
}

function activateForm(form, filters) {
  form.classList.remove('ad-form--disabled');
  const fieldsetsForm = form.querySelectorAll('fieldset');
  fieldsetsForm.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  filters.classList.remove('map__filters--disabled');
  const fieldsetsFilters = filters.querySelectorAll('fieldset');
  fieldsetsFilters.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  const selectsFilters = filters.querySelectorAll('select');
  selectsFilters.forEach((select) => {
    select.disabled = false;
  });
}

export {
  diactivateForm,
  activateForm
};
