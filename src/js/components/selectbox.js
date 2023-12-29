export function selectbox() {
  const selectboxHeads = document.querySelectorAll('[data-selectbox-head]');
  const selectboxTitles = document.querySelectorAll('[data-selectbox-title]');
  const selectboxListElements = document.querySelectorAll('.selectbox__drop ul li');

  if (selectboxHeads.length > 0) {
    selectboxHeads.forEach((item) => {
      item.addEventListener('click', selectboxOpen);
    });

    selectboxTitles.forEach((item) => {
      const selectboxPlaceholder = item.dataset.selectboxTitle;
      if (
        selectboxPlaceholder !== '' &&
        !item.closest('[data-selectbox]').querySelector('li._selected')
      ) {
        item.innerHTML = `<span class="selectbox__legend">${selectboxPlaceholder}</span>`;
      }
    });

    selectboxListElements.forEach((item) => {
      item.addEventListener('click', selectboxChange);
      if (item.classList.contains('_selected')) {
        item.closest('[data-selectbox]').querySelector('[data-selectbox-title]').innerHTML =
          item.innerHTML;
      }
    });
  }

  // Изменяем значение селекта
  function selectboxChange() {
    const thisText = this.innerHTML;
    const selectbox = this.closest('[data-selectbox]');
    const selectboxText = selectbox.querySelector('[data-selectbox-title]');
    const selectboxListEls = selectbox.querySelectorAll('li');

    if (selectbox.classList.contains('_open')) {
      selectbox.classList.remove('_open');
    }

    selectbox.classList.add('_change');

    selectboxText.innerHTML = thisText;

    selectboxListEls.forEach((item) => {
      item.classList.remove('_selected');
    });

    this.classList.add('_selected');
  }

  // Открытие селекта
  function selectboxOpen() {
    const selectbox = this.closest('.selectbox');
    if (!selectbox.classList.contains('_open')) {
      selectboxClose();
      selectbox.classList.add('_open');
    } else {
      selectbox.classList.remove('_open');
    }
  }

  // Закрытие селекта
  function selectboxClose() {
    document.querySelectorAll('.selectbox').forEach((item) => item.classList.remove('_open'));
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.selectbox')) {
      selectboxClose();
    }
  });
}
