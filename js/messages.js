const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

function showSuccessMessage () {
  const copySuccessMessageTemplate = successMessageTemplate.cloneNode(true);
  document.body.appendChild(copySuccessMessageTemplate);
  const successButton = document.querySelector('.success__button');
  const successMessage = document.querySelector('.success');
  successButton.addEventListener('click', () => {
    successMessage.remove();
  });
  document.addEventListener('click', (evt) => {
    if (evt.target.matches('.success')) {
      successMessage.remove();
    }
  });
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      successMessage.remove();
    }
  });
}

function showErrorMessage () {
  const copyErrorMessageTemplate = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(copyErrorMessageTemplate);
  const errorButton = document.querySelector('.error__button');
  const errorMessage = document.querySelector('.error');
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  });
  document.addEventListener('click', (evt) => {
    if (evt.target.matches('.error')) {
      errorMessage.remove();
    }
  });
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      errorMessage.remove();
    }
  });
}

export {showSuccessMessage, showErrorMessage};
