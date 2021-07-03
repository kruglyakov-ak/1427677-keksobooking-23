const DATA_REQUEST_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const ALERT_SHOW_TIME = 5000;
const ERROR_MASSAGE = 'Не удалось загрузить данные объявлений с сервера ошибка: ';
// const successMessage = document.querySelector('#success');
// const errorMessage = document.querySelector('#error');
const showAlert = (message) => {
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

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getData = (onSuccess) => {
  fetch(DATA_REQUEST_URL)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(showAlert(`${ERROR_MASSAGE} ${response.status} — ${response.statusText}`));
    })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => error);
};

export {
  getData
};
