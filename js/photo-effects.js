import {photoPreview} from './photo-scale.js';

const START_VALUE = 100;

const sliderContainer = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
let currentEffect = '';
let effectIntensity = '';

const sliderOptions = {
  'none': {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    effect: '',
    intensity: '',
  },
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    effect: 'grayscale',
    intensity: '',
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    effect: 'sepia',
    intensity: '',
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    effect: 'invert',
    intensity: '%',
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 0,
    step: 0.1,
    effect: 'blur',
    intensity: 'px',
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 0,
    step: 0.1,
    effect: 'brightness',
    intensity: '',
  },
};

const setFilterClass = (className) => {
  photoPreview.classList = '';
  photoPreview.classList.add(className);
};

const updateSliderOptions = ({ range: { min, max }, start, step, effect, intensity }, startValue, display) => {
  currentEffect = effect;
  effectIntensity = intensity;

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  });

  sliderElement.noUiSlider.set(startValue);
  sliderContainer.style.display = display;
};

const resetEffectSettings = () => {
  photoPreview.classList = '';
  photoPreview.style.filter = '';

  updateSliderOptions(sliderOptions.none, START_VALUE, 'none');
};

noUiSlider.create(sliderElement, {
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  photoPreview.style.filter = `${currentEffect}(${unencoded[handle]}${effectIntensity})`;

  effectLevelValue.setAttribute('value', unencoded[handle]);
});

const returnEffectSlider = () => {
  sliderElement.classList.remove('visually-hidden');
  sliderContainer.classList.remove('visually-hidden');
};

const onEffectChange = (evt) => {
  const target = evt.target;
  const targetEffect = target.value;

  if (target && target.value === 'none') {
    resetEffectSettings();

    updateSliderOptions(sliderOptions[targetEffect], START_VALUE, 'none');
  }

  if (target && target.value === 'chrome') {
    setFilterClass('effects__preview--chrome');

    updateSliderOptions(sliderOptions[targetEffect], START_VALUE, 'block');
    returnEffectSlider();
  }

  if (target && target.value === 'sepia') {
    setFilterClass('effects__preview--sepia');

    updateSliderOptions(sliderOptions[targetEffect], START_VALUE, 'block');
    returnEffectSlider();
  }

  if (target && target.value === 'marvin') {
    setFilterClass('effects__preview--marvin');

    updateSliderOptions(sliderOptions[targetEffect], START_VALUE, 'block');
    returnEffectSlider();
  }

  if (target && target.value === 'phobos') {
    setFilterClass('effects__preview--phobos');

    updateSliderOptions(sliderOptions[targetEffect], START_VALUE, 'block');
    returnEffectSlider();
  }

  if (target && target.value === 'heat') {
    setFilterClass('effects__preview--heat');

    updateSliderOptions(sliderOptions[targetEffect], START_VALUE, 'block');
    returnEffectSlider();
  }
};

export {sliderContainer, onEffectChange};
