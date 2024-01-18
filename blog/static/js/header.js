const ISACTIVE = 'is-active';
const ISHIDDEN = 'is-hidden';
const ISOPEN = 'is-open';
const ISFOCUS = 'is-focus';

function dropdownMenu() {
  let dropdownBtns = document.querySelectorAll('.js-btn-dropdown');
  let links = document.querySelectorAll('.menu__link');
  let linkDropdowns = document.querySelectorAll(
    '.menu__item > .m-dropdown > .m-dropdown__item > .m-dropdown__link',
  );

  dropdownBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      this.classList.toggle(ISACTIVE);
      let nextElement = this.nextElementSibling;
      if (nextElement && nextElement.classList.contains('js-nav-dropdown')) {
        nextElement.classList.toggle(ISOPEN);
      }
      return false;
    });
  });

  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      document.querySelectorAll('.menu__item').forEach((item) => {
        if (!item.contains(link)) {
          item.classList.remove(ISFOCUS);
        }
      });
      document.querySelectorAll('.menu__item > .m-dropdown > .m-dropdown__item').forEach((item) => {
        item.classList.remove(ISFOCUS);
      });
    });

    link.addEventListener('keyup', (e) => {
      if (e.keyCode === 9) {
        document.querySelectorAll('.menu__item').forEach((item) => {
          if (!item.contains(link)) {
            item.classList.remove(ISFOCUS);
          }
        });
        let closestItem = link.closest('li');
        if (closestItem) {
          closestItem.classList.add(ISFOCUS);
        }
      }
    });
  });

  linkDropdowns.forEach((linkDropdown) => {
    linkDropdown.addEventListener('keyup', (e) => {
      if (e.keyCode === 9) {
        document
          .querySelectorAll('.menu__item > .m-dropdown > .m-dropdown__item')
          .forEach((item) => {
            if (!item.contains(linkDropdown)) {
              item.classList.remove(ISFOCUS);
            }
          });
        let closestDropdownItem = linkDropdown.closest('.m-dropdown__item');
        if (closestDropdownItem) {
          closestDropdownItem.classList.add(ISFOCUS);
        }
      }
    });
  });
}

function clickHandlers() {
  let burger = document.querySelector('.js-burger');
  let nav = document.querySelector('.js-nav');

  burger.addEventListener('click', () => {
    if (burger.classList.contains(ISOPEN)) {
      burger.classList.remove(ISOPEN);
      nav.classList.remove(ISOPEN);
      document.body.classList.add(ISHIDDEN);
    } else {
      burger.classList.add(ISOPEN);
      nav.classList.add(ISOPEN);
      document.body.classList.remove(ISHIDDEN);
    }
  });

  const MENU_LINKS = nav.querySelectorAll('.js-nav-link');

  MENU_LINKS.forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove(ISOPEN);
      nav.classList.remove(ISOPEN);
      document.body.classList.remove(ISHIDDEN);

      MENU_LINKS.forEach((link) => {
        link.classList.remove(ISACTIVE);
      });

      link.classList.add(ISACTIVE);
    });
  });
}

clickHandlers();
dropdownMenu();
