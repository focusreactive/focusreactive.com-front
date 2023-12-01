import $ from 'jquery';
import { ISOPEN, BODY, ISHIDDEN, ISACTIVE } from './_constants';
import { addBodyHidden, removeBodyHidden } from './bodyHiddenPosition.js';

export function clickFunctions() {
  let burger = $('.js-burger');
  let nav = $('.js-nav');

  $(burger).on('click', function () {
    if ($(this).hasClass(ISOPEN)) {
      $(this).removeClass(ISOPEN);
      $(nav).removeClass(ISOPEN);
      BODY.removeClass(ISHIDDEN);
    } else {
      $(this).addClass(ISOPEN);
      $(nav).addClass(ISOPEN);
      BODY.addClass(ISHIDDEN);
    }
  });

  const MENU_LINKS = nav.find('.js-nav-link');
  MENU_LINKS.on('click', function () {
    burger.removeClass(ISOPEN);
    nav.removeClass(ISOPEN);
    BODY.removeClass(ISHIDDEN);

    MENU_LINKS.removeClass(ISACTIVE);
    $(this).addClass(ISACTIVE);
  });
}
