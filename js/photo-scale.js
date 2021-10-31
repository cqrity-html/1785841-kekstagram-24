const SCALE_STEP = 25;
const MIN_SCALE_VALUE = '25%';
const MAX_SCALE_VALUE = '100%';

const scaleControl = document.querySelector('.scale__control--value');
const zoomOut = document.querySelector('.scale__control--smaller');
const zoomIn = document.querySelector('.scale__control--bigger');
const photoPreview = document.querySelector('.img-upload__preview img');

const decreaseScale = () => {
  const scaleStep = (scaleControl.value === MIN_SCALE_VALUE) ? 0 : SCALE_STEP;
  scaleControl.value = `${(parseInt(scaleControl.value, 10) - scaleStep)}%`;
};

const increaseScale = () => {
  const scaleStep = (scaleControl.value === MAX_SCALE_VALUE) ? 0 : SCALE_STEP;
  scaleControl.value = `${(parseInt(scaleControl.value, 10) + scaleStep)}%`;
};

const changeScale = () => {
  const currentScale = parseInt(scaleControl.value, 10);
  photoPreview.style.transform = `scale(${(currentScale / 100)})`;
};

const onZoomOut = () => {
  decreaseScale();
  changeScale();
};

const onZoomIn = () => {
  increaseScale();
  changeScale();
};

export {zoomOut, zoomIn, photoPreview, onZoomOut, onZoomIn};
