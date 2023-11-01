import $ from 'jquery';
import { getElemHeight } from './getElemSize.js';
import { ISACTIVE, ISDARK, ISLIGHT, ISFIXED } from './_constants.js';

export function header() {
  var scrollTimeout;
  var throttle = 100;
  $(window).on('scroll resize', function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        headerStyles();
        scrollTimeout = null;
      }, throttle);
    }
  });

  $(window).on('scroll load', function () {
    const HEADER = $('.js-header');
    if ($(this).scrollTop() > 0) {
      HEADER.addClass(ISFIXED);
    } else {
      HEADER.removeClass(ISFIXED);
    }
  });
  headerStyles();
  function headerStyles() {
    const HEADER = $('.js-header');
    const ANCHOR_LINKS = $('.js-scroll-to');
    let scroll = $(window).scrollTop();
    let sections = $('.js-scroll-header');
    sections.each(function () {
      if (
        scroll + getElemHeight(HEADER) / 1.7 >= $(this).position().top &&
        $(this).hasClass(ISDARK)
      ) {
        HEADER.removeClass(ISDARK);
        HEADER.addClass('is-light');
        if (window.matchMedia('(min-width: 850px)').matches) {
          let href = $(this).attr('data-section');

          ANCHOR_LINKS.removeClass(ISACTIVE);
          $(`.js-nav-link[href="#${href}"]`).addClass(ISACTIVE);
        }
      } else if (
        scroll + getElemHeight(HEADER) / 1.7 >= $(this).position().top &&
        $(this).hasClass(ISLIGHT)
      ) {
        HEADER.removeClass(ISLIGHT);
        HEADER.addClass(ISDARK);
        if (window.matchMedia('(min-width: 850px)').matches) {
          let href = $(this).attr('data-section');
          ANCHOR_LINKS.removeClass(ISACTIVE);
          $(`.js-nav-link[href="#${href}"]`).addClass(ISACTIVE);
        }
      }
    });
  }
}
