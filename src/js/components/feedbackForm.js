const emailValidator = require('email-validator');

const isProd = process.env.NODE_ENV === 'production';

const netlifyFunctionProd = 'https://fr-functions.netlify.app/.netlify/functions/feedback-form';
const netlifyFunctionDev = 'https://fr-functions.netlify.app/.netlify/functions/feedback-form-dev';

const sendEmail = async (body) => {
  const url = isProd ? netlifyFunctionProd : netlifyFunctionDev;
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers,
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  });
  if (response.ok) {
    return response.ok;
  }
  throw response;
};

const lockForm = (inputs, button) => {
  inputs.forEach((inp) => {
    inp.setAttribute('disabled', true);
  });
  button.setAttribute('disabled', true);
};

const unlockForm = (inputs, button) => {
  inputs.forEach((inp) => {
    inp.removeAttribute('disabled');
  });
  button.setAttribute('disabled', true);
};

const cleanUpForm = (inputs, button) => {
  inputs.forEach((inp) => {
    inp.value = '';
  });
};

const validateField = (input) => {
  const key = input.dataset.key;
  if (!key) return false;

  const value = input.value;
  if (key !== 'visitor-email') {
    const isValid = !!value;
    return {
      isValid,
      message: isValid ? undefined : `field ${key} shouldn't be empty`,
      key,
    };
  }

  const isValid = emailValidator.validate(value);
  return {
    isValid,
    message: isValid ? undefined : 'please enter the valid email',
    key,
  };
};

const validateForm = (inputs, button) => () => {
  const validation = inputs.map(validateField).filter(({ message }) => !!message);

  if (validation.length) {
    button.setAttribute('disabled', true);
    return;
  }
  button.removeAttribute('disabled');
};

const inputOnBlur = (input, updateButton) => () => {
  const { message } = validateField(input);
  updateButton();
  if (!message) {
    input.removeAttribute('title');
    input.classList.remove('error');
    return;
  }

  input.classList.add('error');
  input.setAttribute('title', message);
};

const inputOnType = (input, updateButton) => () => {
  const { message } = validateField(input);
  updateButton();
  if (message) {
    return;
  }

  input.removeAttribute('title');
  input.classList.remove('error');
};

export const feedbackForm = () => {
  const form = document.querySelector('#mail-us-form');
  const button = document.querySelector('#mail-us-form .mail-form__button');

  if (!form) return;
  const inputs = [...document.querySelectorAll('#mail-us-form input, #mail-us-form textarea')];
  if (inputs.length === 0) return;

  const updateButton = validateForm(inputs, button);
  inputs.forEach((input) => {
    input.onblur = inputOnBlur(input, updateButton);
    input.onkeypress = () => setTimeout(inputOnType(input, updateButton), 0);
  });

  form.onsubmit = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const formData = new FormData(form);
    const formEntries = [...formData.entries()];
    const fields = formEntries.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    lockForm(inputs, button);

    sendEmail(fields)
      .then(() => {
        if (window.lintrk) {
          window.lintrk('track', { conversion_id: 13457161 });
          console.log('send');
        }
        cleanUpForm(inputs);
      })
      .then(() => unlockForm(inputs, button))
      .then(() => alert('Your message was sent'))
      .catch((err) => {
        unlockForm(inputs, button);
        alert(`Your message wasn't sent! Please try again or write to hi@focusreactive.com`);
      });
  };
};
