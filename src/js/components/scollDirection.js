import $ from 'jquery';
import { getElemHeight } from './getElemSize';

export function scrollDirection() {
  let scrollPos = 0;

  window.addEventListener('scroll', function () {
    let header = $('.js-header');

    if (window.matchMedia('(max-width: 599px)').matches) {
      if (
        document.body.getBoundingClientRect().top > scrollPos &&
        document.body.getBoundingClientRect().top * -1 < getElemHeight('#home')
      ) {
        header.removeClass('scroll-down');
      } else {
        header.addClass('scroll-down');
      }
    } else {
      header.removeClass('scroll-down');
    }
    // saves the new position for iteration.
    scrollPos = document.body.getBoundingClientRect().top;
  });
}
