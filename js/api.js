const getOrPostData = ({ url, method, body, onSuccessCb, onErrorCb }) => {
  fetch(
    url,
    {
      method,
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        onErrorCb();
      }
    })
    .then((response) => response.json())
    .then((data) => {
      onSuccessCb(data);
    })
    .catch(() => {
      onErrorCb();
    });
};

export {
  getOrPostData
};
