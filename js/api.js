import {
  showAlert
} from './util.js';

const DATA_REQUEST_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const ERROR_MASSAGE = 'Не удалось загрузить данные объявлений с сервера ошибка: ';

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

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData
};
