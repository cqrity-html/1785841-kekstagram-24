import {isEscapeKey} from './util.js';

const DISPLAYED_COMMENTS = 5;

const userDialog = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');
const closeFullSizeButton = document.querySelector('.big-picture__cancel');
const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const commentTemplate = userDialog.querySelector('.social__comment');

const createNewComment = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').title = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const getComments = (comments) => {
  const commentsList = userDialog.querySelector('.social__comments');
  commentList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((currentItem, index) => {
    const comment = createNewComment(currentItem);
    if (index >= DISPLAYED_COMMENTS) {
      comment.classList.add('visually-hidden');
    }
    fragment.appendChild(comment);
  });
  commentsList.appendChild(fragment);
};

const onRandomClick = (evt) => {
  if (evt.target.matches('.big-picture')) {
    userDialog.classList.add('hidden');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.remove('hidden');
    document.body.classList.remove('modal-open');
  }
};

const loadComments = () => {
  const commentHiddenElements = userDialog.querySelectorAll('.social__comment.visually-hidden');
  let countHiddenElements;
  function getCountHiddenElement () {
    if (commentHiddenElements.length > DISPLAYED_COMMENTS) {
      countHiddenElements = DISPLAYED_COMMENTS;
    } else {
      countHiddenElements = commentHiddenElements.length;
    }
  }
  getCountHiddenElement();
  for (let i = 0; i < countHiddenElements; i++) {
    commentHiddenElements[i].classList.remove('visually-hidden');
  }
  if (userDialog.querySelectorAll('.social__comment.visually-hidden').length === 0) {
    commentsLoader.classList.add('hidden');
  }
};

const showCommentCount = () => {
  if (userDialog.querySelectorAll('.social__comment.visually-hidden').length === 0) {
    commentsLoader.classList.add('hidden');
  }
  userDialog.querySelector('.current-comments-count').textContent = `${userDialog.querySelectorAll('.social__comment:not(.visually-hidden)').length}`;
};

const onCommentsOpen = () => {
  loadComments();
  showCommentCount();
};

const closeFullSize = () => {
  userDialog.classList.add('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('click', onRandomClick);
  commentsLoader.removeEventListener('click', onCommentsOpen);
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
    userDialog.querySelector('.comments-count').textContent = item.comments.length;
    userDialog.querySelector('.social__caption').textContent = item.description;
    userDialog.querySelector('.social__comment-count').classList.remove('hidden');
    userDialog.querySelector('.comments-loader').classList.remove('hidden');
    document.body.classList.add('modal-open');
    getComments(item.comments);
    document.addEventListener('click', onRandomClick);
    closeFullSizeButton.addEventListener('click', closeFullSize);
    showCommentCount();
    commentsLoader.addEventListener('click', onCommentsOpen);
  });

  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      closeFullSize();
    }
  });
};

const renderPictures = (pictures) => {
  pictures.forEach((picture) => {
    createMiniature(picture);
  });
};

export {renderPictures, picturesList};
