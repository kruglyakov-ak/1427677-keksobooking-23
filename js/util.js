const ALERT_SHOW_TIME = 5000;
const ERROR_MASSAGE = 'Не удалось загрузить данные объявлений с сервера ошибка: ';

const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '150px';
  alertContainer.style.top = '200px';
  alertContainer.style.right = '150px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = ERROR_MASSAGE;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const enableFormElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  });
};

const disableFormElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  });
};

const addInputValidationIndicator = (input) => {
  input.addEventListener('input', () => {
    if (!input.checkValidity()) {
      input.style.boxShadow = '0 0 2px 2px red';
    } else {
      input.style.boxShadow = '0 0 2px 2px green';
    }
  });
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onPopupEscKeydown = (callback, evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    callback();
  }
};

const getValues = (elements) => {
  const values = [];
  elements.forEach((element) => {
    values.push(element.value);
  });
  return values;
};

export {
  isEscEvent,
  onPopupEscKeydown,
  showAlert,
  enableFormElements,
  disableFormElements,
  addInputValidationIndicator,
  getValues
};
