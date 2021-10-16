const uploadButton = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadform = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const hashtagPattern = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

function onRandomClick (evt) {
  if (evt.target.matches('.img-upload__overlay')) {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
}

function onImageUpload (evt) {
  if (evt.target.matches('input[type="file"]')) {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('click', onRandomClick);
  }
}

uploadform.addEventListener('change', onImageUpload);

uploadCancel.addEventListener('click', () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadButton.value = '';
  document.removeEventListener('click', onRandomClick);
});

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Esc' && !commentField.classList.contains('focused')) {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadButton.value = '';
    document.removeEventListener('click', onRandomClick);
  }
});

uploadform.addEventListener('keydown', (evt) => {
  if (evt.key === 'Esc' && !hashtagField.classList.contains('focused')) {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadButton.value = '';
    document.removeEventListener('click', onRandomClick);
  }
});

function getHashtags () {
  const hashTagsFromInput = hashtagField.value;
  return hashTagsFromInput.split([' ']);
}

hashtagField.addEventListener('input', () => {
  const valueLength = hashtagField.value.length;
  const hashArray = getHashtags();
  const newHastagsArray = [];

  if (hashArray.length > 5) {
    hashtagField.classList.add('error-field');
    hashtagField.setCustomValidity('Можно оставить максимум 5 хэштэгов');
  } else if (valueLength < MIN_NAME_LENGTH) {
    hashtagField.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else {
    hashtagField.classList.remove('error-field');
    hashtagField.setCustomValidity('');
  }

  for (let i = 0; i < hashArray.length; i++) {
    if (newHastagsArray.includes(hashArray[i])) {
      hashtagField.setCustomValidity('Такой хэштэг уже есть');
    }
    newHastagsArray[i] = hashArray[i];
  }

  for (let i = 0; i < hashArray.length; i++) {
    if (hashArray[i].length > MAX_NAME_LENGTH) {
      hashtagField.classList.add('error-field');
      hashtagField.setCustomValidity('Удалите лишние символы из хэштэга');
    } else if (!hashtagPattern.test(hashArray[i])) {
      hashtagField.classList.add('error-field');
      hashtagField.setCustomValidity('Исправьте хэштэги');
    } else {
      hashtagField.classList.remove('error-field');
    }
  }

  hashtagField.reportValidity();
});

hashtagField.addEventListener('focusin', () => hashtagField.classList.add('focused'));
hashtagField.addEventListener('focusout', () => hashtagField.classList.remove('focused'));
commentField.addEventListener('focusin', () => commentField.classList.add('focused'));
commentField.addEventListener('focusout', () => commentField.classList.remove('focused'));

commentField.addEventListener('input', () => {
  const valueLength = commentField.value.length;

  if (valueLength > MAX_COMMENT_LENGTH) {
    commentField.classList.add('error-field');

    commentField.setCustomValidity(`Удалите лишние ${  valueLength - MAX_COMMENT_LENGTH } симв.`);
  } else {
    commentField.classList.remove('error-field');
    commentField.setCustomValidity('');
  }
  commentField.reportValidity();
});
