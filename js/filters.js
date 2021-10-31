import {picturesList, renderPictures} from './pictures.js';

const RENDER_DELAY = 500;
const RANDOM_PHOTOS_NUMBER = 10;

const filterButtonsContainer = document.querySelector('.img-filters');
const filterButtonsForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

const clearPhotoList = () => {
  picturesList.querySelectorAll('.picture')
    .forEach((picture) => picture.remove());
};

const mixPhotos = (array) => {
  const copyArray = array.slice();
  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }
  return copyArray;
};

const filterByDefault = (photos) => photos;
const filterByRandom = (photos) => mixPhotos(photos).slice(0, RANDOM_PHOTOS_NUMBER);
const filterByComments = (photos) => {
  const photosCopy = photos.slice();

  return photosCopy.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
};

const changeFilter = (pictures) => {
  filterButtonsContainer.classList.remove('img-filters--inactive');
  filterButtonsForm.addEventListener('click', (evt) => {
    const target = evt.target;
    for (let i = 0; i <= filterButtons.length; i++) {
      if (!target.classList.contains('img-filters__button--active')) {
        filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
        target.classList.add('img-filters__button--active');
      }
    }
  });

  const onFilterChange = (evt) => {
    const target = evt.target;
    if (target.id === 'filter-default') {
      clearPhotoList();
      renderPictures(filterByDefault(pictures));
    }

    if (target.id === 'filter-random') {
      clearPhotoList();
      renderPictures(filterByRandom(pictures));
    }

    if (target.id === 'filter-discussed') {
      clearPhotoList();
      renderPictures(filterByComments(pictures));
    }
  };

  filterButtonsContainer.addEventListener('click',
    _.debounce(
      (onFilterChange),
      RENDER_DELAY));
};

export {changeFilter};
