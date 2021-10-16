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

export {getRandomIntInclusive};
