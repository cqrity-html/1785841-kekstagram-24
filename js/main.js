// Функция для проверки максимальной длины строки (Кекстаграм).

const commentList = document.querySelector('.social__comments');
const commentfield = document.querySelector('.social__footer-text');
const errorMessage = 'Ой! Ваш комментарий слишком длинный. Попробуйте выразиться чуть лаконичнее.';

function checkCommentLength(comment, maxLength) {
  if (comment.length <= maxLength) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    newComment.textContent = commentfield.value;
    commentList.append(newComment);
  }

  return errorMessage;
}

checkCommentLength(commentfield.value, 140);

// Функция для получения рандомного целого числа.
// Источник: MDN (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random).

const message = 'Упс! Неверный диапазон.';

function getRandomIntInclusive(min, max) {
  if (max <= min) {
    return message;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(0, 10);

//Создание массива из описаний фотографий

function getLikes() {
  return getRandomIntInclusive(15, 200);
}

function chooseAvatar() {
  return `img/avatar-${getRandomIntInclusive(1, 6)}.svg`;
}

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

const COMMENTS_COUNT = 10;
const PHOTO_DESCRIPTION_COUNT = 25;

function createComment() {
  const arrayComments = new Array(COMMENTS_COUNT).fill().map((u, index) => ({
    id: index + 1,
    avatar: chooseAvatar(),
    message: MESSAGES[_.random(0, MESSAGES.length - 1)],
    name: NAMES[_.random(0, NAMES.length - 1)],
  }));
  return arrayComments;
}

function createPhotoDescription() {
  const arrayDescriptions = new Array(PHOTO_DESCRIPTION_COUNT).fill().map((u, index) => ({
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTIONS[_.random(0, DESCRIPTIONS.length - 1)],
    likes: getLikes(),
    comments: createComment(),
  }));
  return arrayDescriptions;
}

createPhotoDescription();
