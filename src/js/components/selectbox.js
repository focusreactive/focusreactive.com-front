export function selectbox() {
  const selectboxHeads = document.querySelectorAll('[data-selectbox-head]');
  const selectboxTitles = document.querySelectorAll('[data-selectbox-title]');

  if (selectboxHeads.length > 0) {
    selectboxHeads.forEach((item) => {
      item.addEventListener('click', selectboxOpen);

      const select = item.parentElement.querySelector('select');

      select.resetSelectbox = () => {
        const selectboxText = item.querySelector('[data-selectbox-title]');
        setSelectboxValue(item.parentElement, selectboxText.dataset.selectboxTitle);
      };

      const values = [...select.options].reduce((acc, opt) => {
        if (opt?.innerText != '') acc.push(opt.innerText);
        return acc;
      }, []);
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

    selectboxListElements.forEach((item) => {
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
    const selectOptions = this.closest('[data-selectbox]').querySelectorAll('option');
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
    selectOptions.forEach((option) => {
      option.val === thisText ? (option.selected = true) : false;
    });
    const sel = selectbox.querySelector('select');
    sel.value = thisText;
  }

  function setSelectboxValue(selectbox, value) {
    const selectOptions = selectbox.querySelectorAll('option');
    const selectboxText = selectbox.querySelector('[data-selectbox-title]');
    const selectboxListEls = selectbox.querySelectorAll('li');

    if (selectbox.classList.contains('_open')) {
      selectbox.classList.remove('_open');
    }

    selectbox.classList.add('_change');

    selectboxText.innerHTML = value;

    selectboxListEls.forEach((item) => {
      item.classList.remove('_selected');
    });

    selectOptions.forEach((option) => {
      option.selected = option.val === value;
    });
    const sel = selectbox.querySelector('select');
    sel.value = value;
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

      const event = new CustomEvent('selectboxOpen', { detail: { selectbox } });
      document.dispatchEvent(event);
    } else {
      selectbox.classList.remove('_open');
      selectbox.querySelector('[data-selectbox-head]').setAttribute('aria-expanded', isOpen);
      selectbox.querySelector('.selectbox__drop').setAttribute('aria-hidden', !isOpen);

      const event = new CustomEvent('selectboxClose', { detail: { selectbox } });
      document.dispatchEvent(event);
    }
  }

  // Закрытие селекта
  function selectboxClose() {
    const selectboxes = document.querySelectorAll('.selectbox._open');
    selectboxes.forEach((item) => item.classList.remove('_open'));

    const event = new CustomEvent('selectboxClose', { detail: { selectbox: selectboxes[0] } });
    document.dispatchEvent(event);
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
