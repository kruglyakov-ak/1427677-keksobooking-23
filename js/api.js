import {
  showAlert
} from './util.js';

const DATA_REQUEST_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';
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
    SEND_DATA_URL,
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
