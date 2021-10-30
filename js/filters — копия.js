import {picturesList} from './pictures.js';
import {debounce} from './utils/debounce.js';
import {getRandomIntInclusive} from './util.js';

const filterButtonsContainer = document.querySelector('.img-filters');
const filterButtonsForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

filterButtonsContainer.classList.remove('img-filters--inactive');

function changeFilter (photos) {
  filterButtonsForm.addEventListener('click', (evt) => {
    const target = evt.target;
    for (let i = 0; i <= filterButtons.length; i++) {
      if (!target.classList.contains('img-filters__button--active')) {
        filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
        target.classList.add('img-filters__button--active');
      }
    }
  });
}
const RANDOM_PICTURES = 10;
const filterDefault = filterButtonsForm.querySelector('#filter-default');
const filterRandom = filterButtonsForm.querySelector('#filter-random');
const filterDiscussed = filterButtonsForm.querySelector('#filter-discussed');

/*const addActiveClass = (button) => {
  const buttons = filterButtonsForm.querySelectorAll('button');
  buttons.forEach((button) => button.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
};*/

function sortsPicturesByComment (pictures) {
  const picturesCopy = pictures.slice();
  const links = picturesList.querySelectorAll('a');
  links.forEach((link) => link.remove());
  picturesCopy.sort((a, b) => a.comments.length - b.comments.length);
  picturesCopy.reverse();
  addingPictures(picturesCopy, picturesList);
}

function sortsPicturesRandom (pictures) {
  const picturesCopy = pictures.slice();
  const randomPictures = [];
  const links = picturesList.querySelectorAll('a');

  links.forEach((link) => link.remove());
  for (let i = 0; i < RANDOM_PICTURES; i++) {
    const randomIndex = getRandomIntInclusive(0, (picturesCopy.length - 1));
    const picture = picturesCopy.splice(randomIndex, 1)[0];
    randomPictures.push(picture);
  }
  addingPictures(randomPictures, picturesList);
}

function sortsPicturesByDefault (pictures) {
  const picturesCopy = pictures.slice();
  const links = picturesList.querySelectorAll('a');
  links.forEach((link) => link.remove());
  addingPictures(picturesCopy, picturesList);
}



filterDiscussed.addEventListener('click', debounce(
  (evt) => onDiscussedFilterClick(evt),
));

filterRandom.addEventListener('click', debounce(
  (evt) => onRandomFilterClick(evt),
));

filterDefault.addEventListener('click', debounce(
  (evt) => onDefaultFilterClick(evt),
));

export {changeFilter};
