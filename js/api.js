const DATA_REQUEST_URL = 'https://23.javascript.pages.academy/keksobooking/data';
// const successMessage = document.querySelector('#success');
// const errorMessage = document.querySelector('#error');

const getData = (onSuccess, onLoadCallback) => {
  fetch(DATA_REQUEST_URL)
    .then((response) => {
      if (response.ok) {
        return response;
      }

      throw new Error();
    })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(onLoadCallback, data);
    })
    .catch(() => onSuccess(onLoadCallback));
};

export {
  getData
};
