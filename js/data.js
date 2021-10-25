import {getRandomIntInclusive} from './util.js';

const DESCRIPTIONS = [
  'Самое лучшее рандомное описание фотографии',
  'Разве может быть что-то красивее?',
  'Вы можете купить у меня это фото за какие-то 10000 рублей',
  'Я - прекрасный фотограф, не правда ли?',
  'Абсолютно оригинальная и необычная фотография, которой больше ни у кого нет',
  'Это фотография изменила мою жизнь',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Дмитрий',
  'Сергей',
  'Алексей',
  'Виктор',
  'Юлия',
  'Мария',
  'Снежана',
];

const PHOTO_DESCRIPTION_COUNT = 25;

const commentList = document.querySelector('.social__comments');
const commentsCount = getCommentsCount();

function getLikes () {
  return getRandomIntInclusive(15, 200);
}

function getCommentsCount () {
  return getRandomIntInclusive(6, 38);
}

function chooseAvatar () {
  return `img/avatar-${getRandomIntInclusive(1, 6)}.svg`;
}

function createComment () {
  const comments = new Array(commentsCount).fill().map((u, index) => ({
    id: index + 1,
    avatar: chooseAvatar(),
    message: MESSAGES[_.random(0, MESSAGES.length - 1)],
    name: NAMES[_.random(0, NAMES.length - 1)],
  }));
  return comments;
}

function createPhotoDescription () {
  const descriptions = new Array(PHOTO_DESCRIPTION_COUNT).fill().map((u, index) => ({
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTIONS[_.random(0, DESCRIPTIONS.length - 1)],
    likes: getLikes(),
    comments: createComment(),
  }));
  return descriptions;
}

createPhotoDescription();

export {createPhotoDescription, createComment, commentList, chooseAvatar};
