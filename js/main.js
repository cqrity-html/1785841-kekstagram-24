// Функция для получения рандомного целого числа.
// Источник: MDN (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random).

function getRandomIntInclusive(min, max) {
  if (max <= min) {
    console.log('Упс! Неверный диапазон.');
    return;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(0, 10);

// Функция для проверки максимальной длины строки (Кекстаграм).

const commentList = document.querySelector('.social__comments');
const commentfield = document.querySelector('.social__footer-text');

function checkCommentLength(comment, maxLength) {
  if (comment.length <= maxLength) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    newComment.textContent = commentfield.value;
    commentList.append(newComment);
  }

  console.log('Ой! Ваш комментарий слишком длинный. Попробуйте выразиться чуть лаконичнее.');
}

checkCommentLength(commentfield.value, 140);
