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
