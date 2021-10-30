import {renderPictures} from './pictures.js';

function getPhotos (onFail) {
  return fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      renderPictures(photos);
    })
    .catch(() => {
      onFail('Не удалось загрузить фотографии. Попробуйте позже');
    });
}

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getPhotos, sendData};
