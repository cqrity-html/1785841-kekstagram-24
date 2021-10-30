import {zoomOut} from './photo-scale.js';
import {zoomIn} from './photo-scale.js';
import {onZoomOut} from './photo-scale.js';
import {onZoomIn} from './photo-scale.js';
import {photoPreview} from './photo-scale.js';
import {sliderContainer} from './photo-effects.js';
import {effectsList} from './photo-effects.js';
import {onEffectChange} from './photo-effects.js';
import {sendData} from './api.js';
import {showSuccessMessage} from './messages.js';
import {showErrorMessage} from './messages.js';
import {isEscapeKey} from './util.js';

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const uploadButton = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadform = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const hashtagPattern = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const getHashtags = () => {
  const hashTagsFromInput = hashtagField.value;
  return hashTagsFromInput.split([' ']);
};

const checkSameHashtag = (currentArray, newArray) => {
  for (let i = 0; i < currentArray.length; i++) {
    if (newArray.includes(currentArray[i])) {
      hashtagField.setCustomValidity('Такой хэштэг уже есть');
    }
    newArray[i] = currentArray[i];
  }
};

const checkHashtags = (currentArray) => {
  for (let i = 0; i < currentArray.length; i++) {
    if (currentArray[i].length > MAX_NAME_LENGTH) {
      hashtagField.classList.add('error-field');
      hashtagField.setCustomValidity('Удалите лишние символы из хэштэга');
    } else if (!hashtagPattern.test(currentArray[i])) {
      hashtagField.classList.add('error-field');
      hashtagField.setCustomValidity('Хэш-тег должен начинается с символа # (решётка). Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т.д. Максимальная длинна хэш-тега не должна превышать 20 символов (включая решетку).');
    } else {
      hashtagField.classList.remove('error-field');
    }
  }
};

const onHashtagInput = () => {
  const hashtagValueLength = hashtagField.value.length;
  const hashtags = getHashtags();
  const newHashtags = [];

  if (hashtags.length > 5) {
    hashtagField.classList.add('error-field');
    hashtagField.setCustomValidity('Можно оставить максимум 5 хэштэгов');
  } else if (hashtagValueLength < MIN_NAME_LENGTH) {
    hashtagField.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - hashtagValueLength } симв.`);
  } else {
    hashtagField.classList.remove('error-field');
    hashtagField.setCustomValidity('');
  }

  checkSameHashtag(hashtags, newHashtags);
  checkHashtags(hashtags);
  hashtagField.reportValidity();
};

const onCommentInput = () => {
  const commnntValueLength = commentField.value.length;

  if (commnntValueLength > MAX_COMMENT_LENGTH) {
    commentField.classList.add('error-field');

    commentField.setCustomValidity(`Удалите лишние ${  commnntValueLength - MAX_COMMENT_LENGTH } симв.`);
  } else {
    commentField.classList.remove('error-field');
    commentField.setCustomValidity('');
  }
  commentField.reportValidity();
};

const closeImageUpload = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadButton.value = '';
  hashtagField.removeEventListener('input', onHashtagInput);
  commentField.removeEventListener('input', onCommentInput);
  uploadCancel.removeEventListener('click', closeImageUpload);
  zoomOut.removeEventListener('click', onZoomOut);
  zoomIn.removeEventListener('click', onZoomIn);
  photoPreview.style.transform = 'scale(1)';
  effectsList.removeEventListener('change', onEffectChange);
  uploadform.reset();
};

const onInputEscapeClose = (evt) => {
  const isHashtagFieldInFocus = document.activeElement === hashtagField;
  const isCommentFieldInFocus = document.activeElement === commentField;

  if ((isEscapeKey) && !(isHashtagFieldInFocus || isCommentFieldInFocus)) {
    evt.preventDefault();
    closeImageUpload();
  }
};

const setUserFormSubmit = (onSuccess) => {
  uploadform.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => showSuccessMessage(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
    uploadform.reset();
    onSuccess();
  });
};

const openImageUpload = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', onInputEscapeClose);
  uploadCancel.addEventListener('click', closeImageUpload);
  hashtagField.addEventListener('input', onHashtagInput);
  commentField.addEventListener('input', onCommentInput);
  zoomOut.addEventListener('click', onZoomOut);
  zoomIn.addEventListener('click', onZoomIn);
  sliderContainer.classList.add('visually-hidden');
  setUserFormSubmit(closeImageUpload);
  effectsList.addEventListener('change', onEffectChange);
};

const onFileUpload = (evt) => {
  if (evt.target.matches('input[type="file"]')) {
    openImageUpload();
  }
};

uploadform.addEventListener('change', onFileUpload);
