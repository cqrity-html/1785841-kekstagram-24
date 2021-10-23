import {zoomOut} from './photo-scale.js';
import {zoomIn} from './photo-scale.js';
import {onZoomOut} from './photo-scale.js';
import {onZoomIn} from './photo-scale.js';
import {photoPreview} from './photo-scale.js';
import {sliderContainer} from './photo-effects.js';

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

uploadform.addEventListener('change', onFileUpload);

function onFileUpload (evt) {
  if (evt.target.matches('input[type="file"]')) {
    openImageUpload();
  }
}

function onRandomClick (evt) {
  if (evt.target.matches('.img-upload__overlay')) {
    closeImageUpload();
  }
}

function getHashtags () {
  const hashTagsFromInput = hashtagField.value;
  return hashTagsFromInput.split([' ']);
}

function checkSameHashtag (currentArray, newArray) {
  for (let i = 0; i < currentArray.length; i++) {
    if (newArray.includes(currentArray[i])) {
      hashtagField.setCustomValidity('Такой хэштэг уже есть');
    }
    newArray[i] = currentArray[i];
  }
}

function checkHashtags (currentArray) {
  for (let i = 0; i < currentArray.length; i++) {
    if (currentArray[i].length > MAX_NAME_LENGTH) {
      hashtagField.classList.add('error-field');
      hashtagField.setCustomValidity('Удалите лишние символы из хэштэга');
    } else if (!hashtagPattern.test(currentArray[i])) {
      hashtagField.classList.add('error-field');
      hashtagField.setCustomValidity('Исправьте хэштэги');
    } else {
      hashtagField.classList.remove('error-field');
    }
  }
}

function onHashtagInput () {
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
}

function onCommentInput () {
  const commnntValueLength = commentField.value.length;

  if (commnntValueLength > MAX_COMMENT_LENGTH) {
    commentField.classList.add('error-field');

    commentField.setCustomValidity(`Удалите лишние ${  commnntValueLength - MAX_COMMENT_LENGTH } симв.`);
  } else {
    commentField.classList.remove('error-field');
    commentField.setCustomValidity('');
  }
  commentField.reportValidity();
}

function openImageUpload () {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('click', onRandomClick);

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Esc' && !commentField.classList.contains('focused')) {
      closeImageUpload();
    }
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !hashtagField.classList.contains('focused')) {
      closeImageUpload();
    }
  });

  uploadCancel.addEventListener('click', closeImageUpload);
  hashtagField.addEventListener('input', onHashtagInput);
  commentField.addEventListener('input', onCommentInput);
  hashtagField.addEventListener('focusin', () => {
    hashtagField.classList.add('focused');
  });
  hashtagField.addEventListener('focusout', () => {
    hashtagField.classList.remove('focused');
  });
  commentField.addEventListener('focusin', () => {
    commentField.classList.add('focused');
  });
  commentField.addEventListener('focusout', () => {
    commentField.classList.remove('focused');
  });

  zoomOut.addEventListener('click', onZoomOut);
  zoomIn.addEventListener('click', onZoomIn);
  sliderContainer.classList.add('visually-hidden');
}

function closeImageUpload () {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadButton.value = '';
  document.removeEventListener('click', onRandomClick);
  hashtagField.removeEventListener('input', onHashtagInput);
  commentField.removeEventListener('input', onCommentInput);
  uploadCancel.removeEventListener('click', closeImageUpload);
  hashtagField.removeEventListener('focusin', () => {
    hashtagField.classList.add('focused');
  });
  hashtagField.removeEventListener('focusout', () => {
    hashtagField.classList.remove('focused');
  });
  commentField.removeEventListener('focusin', () => {
    commentField.classList.add('focused');
  });
  commentField.removeEventListener('focusout', () => {
    commentField.classList.remove('focused');
  });
  zoomOut.removeEventListener('click', onZoomOut);
  zoomIn.removeEventListener('click', onZoomIn);
  photoPreview.style.transform = 'scale(1)';
}

export {uploadOverlay};
