import {renderPictures} from './pictures.js';
import {changeFilter} from './filters.js';

const getPhotos = (onFail) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      renderPictures(photos);
      changeFilter(photos);
    })
    .catch(() => {
      onFail('Не удалось загрузить фотографии. Попробуйте позже');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => response.ok ? onSuccess() : onFail('Не удалось отправить форму. Попробуйте ещё раз'))
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getPhotos, sendData};
