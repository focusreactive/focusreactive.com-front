const emailValidator = require('email-validator');

const isProd = process.env.NODE_ENV === 'production';

const netlifyFunctionProd = 'https://fr-functions.netlify.app/.netlify/functions/feedback-form';
const netlifyFunctionDev = 'https://fr-functions.netlify.app/.netlify/functions/feedback-form-dev';

const sendEmail = async (body) => {
  const url = isProd ? netlifyFunctionProd : netlifyFunctionDev;
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  // TODO: remove this when we have a proper email template
  body['visitor-message'] = `MESSAGE: ${body['visitor-message']} ~~~ SUBJECT: ${body[
    'visitor-subject'
  ].join(', ')} ~~~ ESTIMATED BUDGET: ${body['visitor-estimated-budget']} ~~~ TIMEFRAME: ${
    body['visitor-timeframe']
  }`;

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
    if (inp.tagName === 'SELECT' && typeof inp.resetSelectbox === 'function') {
      inp.resetSelectbox();
      return;
    }

    if (inp.type === 'checkbox' && inp.type === 'radio') {
      inp.checked = false;
      return;
    }

    inp.value = '';
  });
};

const validateSelectbox = (selectbox) => {
  const key = selectbox.dataset.key;
  if (!key)
    return {
      isValid: false,
      message: 'something went wrong',
      key,
    };

  const select = selectbox.querySelector('select');
  if (!select)
    return {
      isValid: false,
      message: 'something went wrong',
      key,
    };

  const value = select.value;
  const isValid = !!value;
  return {
    isValid,
    message: isValid ? undefined : `field ${key} shouldn't be empty`,
    key,
  };
};

const validateField = (input) => {
  let key = input.dataset.key;

  if (input.tagName === 'SELECT') {
    const selectbox = input.closest('.selectbox');
    const selectboxValidation = validateSelectbox(selectbox);
    if (selectboxValidation.isValid) {
      return selectboxValidation;
    }
    key = selectboxValidation.key;
  }

  if (input.type === 'checkbox' && input.type === 'radio')
    return { isValid: true, message: undefined, key };

  if (!key)
    return {
      isValid: false,
      message: 'something went wrong',
      key,
    };

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

const createInputGroups = (inputs) => {
  // returns array of inputs, if inputs have the same "name" add it to the nested array
  return inputs.reduce((arr, input) => {
    const name = input.getAttribute('name');
    const group = arr.find((g) => g.name === name);
    if (group) {
      group.inputs.push(input);
      return arr;
    }
    return [...arr, { name, inputs: [input] }];
  }, []);
};

const validateSubjectCheckboxes = (inputGroup) => {
  const containsSelected = inputGroup.inputs.some((input) => input.checked);
  return {
    isValid: containsSelected,
    message: containsSelected ? undefined : `field ${inputGroup.name} shouldn't be empty`,
    key: inputGroup.name,
  };
};

const validateForm = (inputs, button, groupedInputs) => () => {
  const validation = inputs.map(validateField).filter(({ message }) => !!message);

  if (groupedInputs) {
    const subjectGroup = groupedInputs.find(({ name }) => name === 'visitor-subject');
    const subjectValidation = validateSubjectCheckboxes(subjectGroup);
    if (subjectValidation.message) {
      validation.push(subjectValidation);
    }
  }

  if (validation.length) {
    button.setAttribute('disabled', true);
    return;
  }
  button.removeAttribute('disabled');
};

const onChangeSubjectCheckboxes = (subjectGroup, updateButton) => {
  const subjectValidation = validateSubjectCheckboxes(subjectGroup);

  if (subjectValidation.message) {
    subjectGroup.inputs.forEach((input) => {
      input.classList.add('error');
      input.setAttribute('title', subjectValidation.message);
    });
  } else {
    subjectGroup.inputs.forEach((input) => {
      input.classList.remove('error');
      input.removeAttribute('title');
    });
  }

  updateButton();
};

const onSelectboxClose = (event, updateButton) => {
  const selectbox = event.detail.selectbox;

  if (!selectbox) return;

  const { message } = validateSelectbox(selectbox);
  if (!message) {
    selectbox.removeAttribute('title');
    selectbox.classList.remove('error');
    updateButton();
    return;
  }

  selectbox.classList.add('error');
  selectbox.setAttribute('title', message);
  updateButton();
};

const onSelectboxOpen = (event, updateButton) => {
  const selectbox = event.detail.selectbox;
  if (!selectbox) return;

  selectbox.removeAttribute('title');
  selectbox.classList.remove('error');
  updateButton();
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
  const inputs = [
    ...document.querySelectorAll(
      '#mail-us-form input, #mail-us-form textarea, #mail-us-form select',
    ),
  ];
  if (inputs.length === 0) return;

  const groupedInputs = createInputGroups(inputs);
  const updateButton = validateForm(inputs, button, groupedInputs);

  const subjectGroup = groupedInputs.find(({ name }) => name === 'visitor-subject');
  subjectGroup.inputs.forEach((input) => {
    input.addEventListener('change', () => onChangeSubjectCheckboxes(subjectGroup, updateButton));
  });

  inputs.forEach((input) => {
    if (input.name === 'visitor-subject') return;
    input.onblur = inputOnBlur(input, updateButton);
    input.onkeypress = () => setTimeout(inputOnType(input, updateButton), 0);
  });

  document.addEventListener('selectboxOpen', (event) => onSelectboxOpen(event, updateButton));
  document.addEventListener('selectboxClose', (event) => onSelectboxClose(event, updateButton));

  form.onsubmit = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const formData = new FormData(form);
    const formEntries = [...formData.entries()];
    const fields = formEntries.reduce((obj, [key, value]) => {
      if (key === 'visitor-subject') {
        return { ...obj, [key]: [...(obj[key] || []), value] };
      }
      return { ...obj, [key]: value };
    }, {});
    fields.path = window.location.href.split(/\?|#/)[0];
    lockForm(inputs, button);

    sendEmail(fields)
      .then(() => {
        if (window.lintrk) {
          window.lintrk('track', { conversion_id: 13457161 });
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
