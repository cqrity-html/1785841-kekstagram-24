import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 5000;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const showSuccessMessage = () => {
  const copySuccessMessageTemplate = successMessageTemplate.cloneNode(true);
  document.body.appendChild(copySuccessMessageTemplate);
  const successButton = document.querySelector('.success__button');
  const successMessage = document.querySelector('.success');
  const removeSuccessMessage = () => successMessage.remove();
  successButton.addEventListener('click', removeSuccessMessage);
  document.addEventListener('click', (evt) => {
    if (evt.target.matches('.success')) {
      successButton.removeEventListener('click', removeSuccessMessage);
      successMessage.remove();
    }
  });
  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      successButton.removeEventListener('click', () => {
        successMessage.remove();
      });
      successMessage.remove();
    }
  });
};

const showErrorMessage = () => {
  const copyErrorMessageTemplate = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(copyErrorMessageTemplate);
  const errorButton = document.querySelector('.error__button');
  const errorMessage = document.querySelector('.error');
  const removeErrorMessage = () => errorMessage.remove();
  errorButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('click', (evt) => {
    if (evt.target.matches('.error')) {
      errorButton.removeEventListener('click', removeErrorMessage);
      errorMessage.remove();
    }
  });
  window.addEventListener('keydown', (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      errorButton.removeEventListener('click', removeErrorMessage);
      errorMessage.remove();
    }
  });
};

const showAlert = (errorMessage) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = errorMessage;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert, showSuccessMessage, showErrorMessage};
