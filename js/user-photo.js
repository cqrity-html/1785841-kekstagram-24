import {photoPreview} from './photo-scale.js';
import {uploadButton} from './upload-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

uploadButton.addEventListener('change', () => {
  const file = uploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    fileName.endsWith(it);
  });
  photoPreview.src = URL.createObjectURL(file);

  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
  }
});
