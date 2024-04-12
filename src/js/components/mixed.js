import { ISHIDDEN, ISACTIVE } from './_constants';
import $ from 'jquery';

export function mixed() {
  const nav = $('.js-mixed-nav');
  const navBtns = $('.js-mixed-btn');
  const items = $('.js-mixed-items');
  const headerHeight = $('.header').innerHeight();
  const navHeight = nav.innerHeight();
  navBtns.on('click', function () {
    const tagName = $(this).text().toLowerCase().replace(' ', '-');
    const isBntActive = $(this).hasClass(ISACTIVE) ? true : false;
    const scrollDest = $($(this).attr('href'));
    navBtns.not($(this)).removeClass(ISACTIVE);
    $(this).toggleClass(ISACTIVE);

    items.each(function (i, item) {
      const splitItem = $(item).data('tags').toLowerCase().replace(/ /g, '-').split(',');

      if (isBntActive) {
        $(item).removeClass(ISHIDDEN);
      } else {
        if (!splitItem.includes(tagName)) {
          $(item).addClass(ISHIDDEN);
        } else {
          $(item).removeClass(ISHIDDEN);
        }
      }
    });
    if (scrollDest.length) {
      $('html, body')
        .stop()
        .animate({ scrollTop: scrollDest.offset().top - headerHeight - navHeight + 'px' }, 500);
    }
  });
}
