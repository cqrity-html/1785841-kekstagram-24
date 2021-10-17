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

function onHashtagInput () {
  const valueLength = hashtagField.value.length;
  const hastags = getHashtags();
  const newHastags = [];

  if (hastags.length > 5) {
    hashtagField.classList.add('error-field');
    hashtagField.setCustomValidity('Можно оставить максимум 5 хэштэгов');
  } else if (valueLength < MIN_NAME_LENGTH) {
    hashtagField.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else {
    hashtagField.classList.remove('error-field');
    hashtagField.setCustomValidity('');
  }

  for (let i = 0; i < hastags.length; i++) {
    if (newHastags.includes(hastags[i])) {
      hashtagField.setCustomValidity('Такой хэштэг уже есть');
    }
    newHastags[i] = hastags[i];
  }

  for (let i = 0; i < hastags.length; i++) {
    if (hastags[i].length > MAX_NAME_LENGTH) {
      hashtagField.classList.add('error-field');
      hashtagField.setCustomValidity('Удалите лишние символы из хэштэга');
    } else if (!hashtagPattern.test(hastags[i])) {
      hashtagField.classList.add('error-field');
      hashtagField.setCustomValidity('Исправьте хэштэги');
    } else {
      hashtagField.classList.remove('error-field');
    }
  }

  hashtagField.reportValidity();
}

function onCommentInput () {
  const valueLength = commentField.value.length;

  if (valueLength > MAX_COMMENT_LENGTH) {
    commentField.classList.add('error-field');

    commentField.setCustomValidity(`Удалите лишние ${  valueLength - MAX_COMMENT_LENGTH } симв.`);
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
    if (evt.key === 'Escape' && evt.key === 'Escape' && !hashtagField.classList.contains('focused')) {
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
}
