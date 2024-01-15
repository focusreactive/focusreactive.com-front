export function selectbox() {
  const selectboxHeads = document.querySelectorAll('[data-selectbox-head]');
  const selectboxTitles = document.querySelectorAll('[data-selectbox-title]');

  if (selectboxHeads.length > 0) {
    selectboxHeads.forEach((item) => {
      item.addEventListener('click', selectboxOpen);

      const select = item.parentElement.querySelector('select');
      const values = [...select.options].map((opt) => opt?.innerText || '');
      const drop = item.parentElement.querySelector('.selectbox__drop');
      const ul = document.createElement('ul');
      drop.appendChild(ul);
      values.forEach((val) => {
        const li = document.createElement('li');
        li.innerText = val;
        li.setAttribute('role', 'menu-item');
        li.setAttribute('tabindex', '-1');
        ul.setAttribute('role', 'menu');

        ul.appendChild(li);
      });
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

    const selectboxListElements = document.querySelectorAll('.selectbox__drop ul li');

    selectboxListElements.forEach((item, itemIndex) => {
      item.addEventListener('click', selectboxChange);
      item.addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
          e.currentTarget.click();
        }
      });

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

    const sel = selectbox.querySelector('select');
    sel.value = thisText;
  }

  // Открытие селекта
  function selectboxOpen() {
    const selectbox = this.closest('.selectbox');
    let isOpen = false;
    if (!selectbox.classList.contains('_open')) {
      selectboxClose();
      selectbox.classList.add('_open');
      selectbox.querySelector('[data-selectbox-head]').setAttribute('aria-expanded', !isOpen);
      selectbox.querySelector('.selectbox__drop').setAttribute('aria-hidden', isOpen);
      let activeIndex = -1;
      selectbox.addEventListener('keydown', function (e) {
        const selectobxLi = this.querySelectorAll('li');
        if (e.keyCode === 40) {
          e.preventDefault();
          if (activeIndex < selectobxLi.length - 1) activeIndex++;
          selectobxLi[activeIndex].focus();
        }

        if (e.keyCode === 38) {
          e.preventDefault();
          if (activeIndex > 0) activeIndex--;
          selectobxLi[activeIndex].focus();
        }
        if (e.keyCode === 9) {
          selectboxClose();
        }
      });
    } else {
      selectbox.classList.remove('_open');
      selectbox.querySelector('[data-selectbox-head]').setAttribute('aria-expanded', isOpen);
      selectbox.querySelector('.selectbox__drop').setAttribute('aria-hidden', !isOpen);
    }
  }

  // Закрытие селекта
  function selectboxClose() {
    document.querySelectorAll('.selectbox').forEach((item) => item.classList.remove('_open'));
  }

  document.body.addEventListener('keydown', function (e) {
    if (e.key == 'Escape') {
      selectboxClose();
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.selectbox')) {
      selectboxClose();
    }
  });
}
