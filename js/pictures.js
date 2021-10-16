import {createPhotoDescription} from './data.js';
import {chooseAvatar} from './data.js';
import {createComment} from './data.js';

const userDialog = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');
const closeFullsizeButton = document.querySelector('.big-picture__cancel');
const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPictures = createPhotoDescription();
const similarComments = createComment();

function onRandomClick (evt) {
  if (evt.target.matches('.big-picture')) {
    userDialog.classList.add('hidden');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.remove('hidden');
    document.body.classList.remove('modal-open');
  }
}

const addComment = (comment) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');
  commentList.append(newComment);
  const newCommentAvatar = document.createElement('img');
  newCommentAvatar.classList.add('social__picture');
  newCommentAvatar.src = chooseAvatar();
  newCommentAvatar.alt = comment.name;
  newCommentAvatar.width = '35';
  newCommentAvatar.heighth = '35';
  newComment.append(newCommentAvatar);
  const newCommentText = document.createElement('p');
  newCommentText.textContent = comment.message;
  newComment.append(newCommentText);
};

const createMiniature = (item) => {
  const copyPictureTemplate = pictureTemplate.cloneNode(true);
  copyPictureTemplate.querySelector('.picture__img').src = item.url;
  copyPictureTemplate.querySelector('.picture__likes').textContent = item.likes;
  copyPictureTemplate.querySelector('.picture__comments').textContent = item.comments.length;
  picturesList.append(copyPictureTemplate);

  copyPictureTemplate.addEventListener('click', (evt) => {
    evt.preventDefault();
    userDialog.classList.remove('hidden');
    userDialog.querySelector('.big-picture__img img').src = item.url;
    userDialog.querySelector('.likes-count').textContent = item.likes;
    userDialog.querySelector('.comments-count').textContent = similarComments.length;
    userDialog.querySelector('.social__caption').textContent = item.description;
    userDialog.querySelector('.social__comment-count').classList.remove('hidden');
    userDialog.querySelector('.comments-loader').classList.remove('hidden');
    document.body.classList.add('modal-open');
    commentList.innerHTML = '';
    for (let i = 1; i < 2; i++) {
      similarComments.forEach((comment) => {
        addComment(comment);
      });
    }
    document.addEventListener('click', onRandomClick);
  });
};

similarPictures.forEach((picture) => {
  createMiniature(picture);
});

closeFullsizeButton.addEventListener('click', () => {
  userDialog.classList.add('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('click', onRandomClick);
});

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    if (!userDialog.classList.contains('hidden')) {
      evt.preventDefault();
      userDialog.classList.add('hidden');
      socialCommentCount.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
      document.body.classList.remove('modal-open');
      document.removeEventListener('click', onRandomClick);
    }
  }
});
